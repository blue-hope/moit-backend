import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeatUserGroup1612859835937 implements MigrationInterface {
  name = 'AddCascadeatUserGroup1612859835937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_3d6b372788ab01be58853003c93"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD "approval" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_3d6b372788ab01be58853003c93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" DROP CONSTRAINT "FK_3d6b372788ab01be58853003c93"`,
    );
    await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "approval"`);
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_group" ADD CONSTRAINT "FK_3d6b372788ab01be58853003c93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
