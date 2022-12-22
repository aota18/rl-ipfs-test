import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1666298164810 implements MigrationInterface {
  name = 'InitDB1666298164810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "married" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "married" DROP DEFAULT`,
    );
  }
}
