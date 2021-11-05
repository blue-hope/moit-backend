import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoardPlan1612613493381 implements MigrationInterface {
  name = 'AddBoardPlan1612613493381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_group" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "groupId" integer, CONSTRAINT "PK_3c29fba6fe013ec8724378ce7c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "start_at" TIMESTAMP NOT NULL, "end_at" TIMESTAMP NOT NULL, "description" text, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "is_dummy" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "boardId" integer, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_3d6b372788ab01be58853003c93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan" ADD CONSTRAINT "FK_b99bc868ea31aa44026593d1841" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plan" DROP CONSTRAINT "FK_b99bc868ea31aa44026593d1841"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_3d6b372788ab01be58853003c93"`,
    );
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`DROP TABLE "user_group"`);
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
