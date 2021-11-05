import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1609625031864 implements MigrationInterface {
  name = 'Initial1609625031864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`,
    );
    await queryRunner.query(`DROP TABLE "auth"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
