import { MigrationInterface, QueryRunner } from 'typeorm';

export class add1610793405295 implements MigrationInterface {
  name = 'add1610793405295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`,
    );
    await queryRunner.query(
      `CREATE TABLE "adminUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(128) NOT NULL, CONSTRAINT "UQ_58bd2b086488ba1ba90847a192e" UNIQUE ("username"), CONSTRAINT "PK_f155e50a944f2658dc1ccb477a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`,
    );
    await queryRunner.query(`DROP TABLE "adminUser"`);
    await queryRunner.query(
      `ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
