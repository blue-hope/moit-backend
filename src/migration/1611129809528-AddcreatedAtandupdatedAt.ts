import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddcreatedAtandupdatedAt1611129809528
  implements MigrationInterface {
  name = 'AddcreatedAtandupdatedAt1611129809528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
  }
}
