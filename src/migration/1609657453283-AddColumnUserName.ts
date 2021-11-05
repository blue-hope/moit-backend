import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnUserName1609657453283 implements MigrationInterface {
  name = 'AddColumnUserName1609657453283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
  }
}
