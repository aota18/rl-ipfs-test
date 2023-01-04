import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class URLService {
  private logger: Logger = new Logger(URLService.name);

  constructor(private readonly httpService: HttpService) {}

  public async getShortenedURL(url) {
    try {
      const key = 'b52f033e84582b52e723b24f04c2cb85a262c';
      const BASE_URL = 'https://cutt.ly/api/api.php';

      const result = await this.httpService.axiosRef.get(
        `${BASE_URL}?key=${key}&short=${url}`,
      );

      return result.data;
    } catch (err) {
      this.logger.error(err.message);
      return null;
    }
  }
}
