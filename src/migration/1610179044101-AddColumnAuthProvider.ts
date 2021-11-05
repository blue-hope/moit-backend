import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnAuthProvider1610179044101 implements MigrationInterface {
  name = 'AddColumnAuthProvider1610179044101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth" ADD "provider" character varying NOT NULL DEFAULT 'local'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "provider"`);
  }
}
