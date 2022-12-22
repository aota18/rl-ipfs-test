import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import Moralis from 'moralis';
import { UsersService } from '../users/users.service';
import { UploadService } from '../services/upload.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private uploadService: UploadService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async me(user) {
    try {
      return {
        status: HttpStatus.OK,
        message: '',
        data: user,
      };
    } catch (err) {
      this.logger.error(err);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      };
    }
  }

  async login(req) {
    const { account, chain, network } = req;

    const config = {
      domain: this.configService.get('APP_DOMAIN'),
      statement: 'Please sign this message to confirm your identity.',
      uri: this.configService.get('AUTH_URL'),
      timeout: 60,
    };

    try {
      const hasAccount = await this.hasAccount(account);

      let payload;

      /* User who has already login */
      if (hasAccount) {
        const user = await this.usersService.getUserByWalletAddr(account);

        payload = {
          id: user.id,
          address: user.walletAddr,
          chain: chain.id,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImg: user.profileURL,
          isGuest: user.isGuest,
          network,
        };

        /* If User is not logged in, Create new one as guest */
      } else {
        const result = await this.usersService.createUser({
          walletAddr: account,
        });

        payload = {
          address: account,
          chain: chain.id,
          network,
          isGuest: true,
        };
      }

      this.logger.debug(payload);

      const message = await Moralis.Auth.requestMessage({
        ...payload,
        ...config,
      });

      this.logger.debug(message);

      return { msg: message, user: { ...payload } };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async authorize(req) {
    try {
      // "message" and "signature" are needed for authorization
      // we described them in "credentials" above
      const { message, signature } = req;

      const payload = (
        await Moralis.Auth.verify({ message, signature, network: 'evm' })
      ).raw;

      const user = { ...payload, signature };
      // returning the user object and creating  a session

      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };

      return user;
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  async hasAccount(walletAddress) {
    try {
      const user = await this.usersService.getUserByWalletAddr(walletAddress);

      if (!user) {
        return false;
      }

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async signup(profileImg, body) {
    const { walletAddr } = body;

    const signupInput = {
      ...body,
      isGuest: false,
    };

    /* Save Profile Image into S3 and get URL */
    if (profileImg) {
      const fileNamePrefix = `user/${walletAddr}/profile`;
      const img = await this.uploadService.addAvatar(
        profileImg.buffer,
        fileNamePrefix,
      );
      const profileURL = img.Location;

      signupInput.profileURL = profileURL;
    }

    try {
      /* Save into Database */

      const user = await this.usersService.getUserByWalletAddr(walletAddr);

      // User is not a guest
      if (!user) {
        const user = await this.usersService.createUser(signupInput);

        return {
          status: HttpStatus.OK,
          message: 'Successfully signed up!',
          data: {
            id: user.data.id,
            firstName: user.data.firstName,
            walletAddr: user.data.walletAddr,
          },
        };
        // User was guest
      } else {
        await this.usersService.updateUser(user.id, signupInput);

        return {
          status: HttpStatus.OK,
          message: 'Successfully signed up!',
          data: {},
        };
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Signup Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signupGuest(body) {
    const { walletAddress } = body;

    try {
      const user = await this.usersService.createUser({
        walletAddr: walletAddress,
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }
}
