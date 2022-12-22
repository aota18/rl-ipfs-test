import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //@ts-ignore
      useFactory: (configService: ConfigService) => {
        const param = {
          type: 'postgres',
          host: process.env.POSTGRES_DB_HOST,
          port: process.env.POSTGRES_DB_PORT,
          username: process.env.POSTGRES_DB_USER,
          password: process.env.POSTGRES_DB_PASSWORD,
          database: process.env.POSTGRES_DB_SCHEMA,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        };

        console.log('====CHECK1====', param);

        return param;
        // return {
        //   type: 'postgres',
        //   host: configService.get(
        //     process.env.NODE_ENV === 'development'
        //       ? 'POSTGRES_HOST_LOCAL'
        //       : 'POSTGRES_HOST_DEV',
        //   ),
        //   port: configService.get('POSTGRES_PORT'),
        //   username: configService.get('POSTGRES_USER'),
        //   password: configService.get('POSTGRES_PASSWORD'),
        //   database: configService.get('POSTGRES_DATABASE'),
        //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        //   synchronize: true,
        // };
      },
    }),
  ],
})
export class DatabaseModule {}
