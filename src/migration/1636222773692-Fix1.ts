import {MigrationInterface, QueryRunner} from "typeorm";

export class Fix11636222773692 implements MigrationInterface {
    name = 'Fix11636222773692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` ADD `step` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `restaurant` ADD `image_key` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `restaurant` DROP COLUMN `image_key`");
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `step`");
    }

}
