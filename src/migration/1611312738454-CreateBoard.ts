import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBoard1611312738454 implements MigrationInterface {
  name = 'CreateBoard1611312738454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "adminUser" RENAME COLUMN "username" TO "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "adminUser" RENAME CONSTRAINT "UQ_58bd2b086488ba1ba90847a192e" TO "UQ_2461a300fe1ed769d7a96fa054b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" SERIAL NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(
      `ALTER TABLE "adminUser" RENAME CONSTRAINT "UQ_2461a300fe1ed769d7a96fa054b" TO "UQ_58bd2b086488ba1ba90847a192e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "adminUser" RENAME COLUMN "email" TO "username"`,
    );
  }
}
