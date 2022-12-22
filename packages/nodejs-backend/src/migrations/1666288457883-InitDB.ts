import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1666288457883 implements MigrationInterface {
  name = 'InitDB1666288457883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" character varying NOT NULL DEFAULT 'IMAGE', "category" character varying NOT NULL DEFAULT 'EVENT_IMAGE', "url" character varying NOT NULL, "ext" character varying, "eventId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "privacy" character varying NOT NULL DEFAULT 'PUBLIC', "repeat" character varying NOT NULL DEFAULT 'NEVER', "repeatEndDt" integer, "password" character varying, "isOnline" boolean NOT NULL, "addr1" character varying NOT NULL, "addr2" character varying NOT NULL, "eventStartDt" integer NOT NULL, "eventEndDt" integer NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'CREATED', "isPromoted" boolean NOT NULL DEFAULT false, "hostId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "walletAddr" character varying NOT NULL, "chainId" integer NOT NULL DEFAULT '1', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "profileURL" character varying NOT NULL, "nationality" character varying NOT NULL, "birthday" integer NOT NULL, "companyAddr1" character varying NOT NULL, "companyAddr2" character varying NOT NULL, "twitterHandle" character varying NOT NULL, "married" boolean NOT NULL, "marriageDt" integer NOT NULL, "isReported" boolean NOT NULL DEFAULT false, "isBlocked" boolean NOT NULL DEFAULT false, "ensAddr" character varying NOT NULL, CONSTRAINT "UQ_b5ea5d577896700627746346847" UNIQUE ("walletAddr"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "roles" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_4f40a4a46ca65138c9462d912fe" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_fb103c0ac614a2d39d6b62de6fd" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_fb103c0ac614a2d39d6b62de6fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_4f40a4a46ca65138c9462d912fe"`,
    );
    await queryRunner.query(`DROP TABLE "admin"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "media"`);
  }
}
