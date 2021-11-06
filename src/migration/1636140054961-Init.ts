import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1636140054961 implements MigrationInterface {
  name = 'Init1636140054961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `menu` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `price` int NOT NULL, `image_key` varchar(255) NOT NULL, `restaurant_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `fee` (`id` int NOT NULL AUTO_INCREMENT, `price_start` int NOT NULL, `price_end` int NOT NULL, `delivery_fee` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `restaurant_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `participant` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `order_id` int NULL, `user_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `restaurant_id` int NULL, `creator_id` int NULL, `fee_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `restaurant` (`id` int NOT NULL AUTO_INCREMENT, `account` varchar(255) NOT NULL, `open_at` timestamp NOT NULL, `close_at` timestamp NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `category_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `zone` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `university_id` int NULL, `restaurant_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `university` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `region_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `region` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `latitude` int NOT NULL, `longitude` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `phone_number` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `region_id` int NULL, `university_id` int NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_01eea41349b6c9275aec646eee` (`phone_number`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `auth` (`id` int NOT NULL AUTO_INCREMENT, `password` varchar(255) NOT NULL, `salt` varchar(255) NOT NULL, `user_id` int NULL, UNIQUE INDEX `REL_9922406dc7d70e20423aeffadf` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `menu` ADD CONSTRAINT `FK_a9c5473205703022c7a53a410c2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `fee` ADD CONSTRAINT `FK_1415ccec8a50551ed3baad43d72` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `participant` ADD CONSTRAINT `FK_cf9113dc486e9d53e33807cf6f7` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `participant` ADD CONSTRAINT `FK_7916773e236a9cfc13d59f96a4a` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_3edfcab660a53a1ac59e0e51911` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_5afa7e27cce8bc1b75ea54968c8` FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_82816cf2eaae947ff6fc15da26d` FOREIGN KEY (`fee_id`) REFERENCES `fee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `restaurant` ADD CONSTRAINT `FK_848ac5e4e3e511560d07e36a257` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `zone` ADD CONSTRAINT `FK_bbf299b3c534c78fd7896f7df67` FOREIGN KEY (`university_id`) REFERENCES `university`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `zone` ADD CONSTRAINT `FK_5b545fdb303b329fde24d0d4279` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `university` ADD CONSTRAINT `FK_d3b5700d08c2113fdcde2e9e35a` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD CONSTRAINT `FK_68c168fe38b5826502b831f9f83` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `user` ADD CONSTRAINT `FK_1518391a178a27840edf478c7b9` FOREIGN KEY (`university_id`) REFERENCES `university`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `auth` ADD CONSTRAINT `FK_9922406dc7d70e20423aeffadf3` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `auth` DROP FOREIGN KEY `FK_9922406dc7d70e20423aeffadf3`',
    );
    await queryRunner.query(
      'ALTER TABLE `user` DROP FOREIGN KEY `FK_1518391a178a27840edf478c7b9`',
    );
    await queryRunner.query(
      'ALTER TABLE `user` DROP FOREIGN KEY `FK_68c168fe38b5826502b831f9f83`',
    );
    await queryRunner.query(
      'ALTER TABLE `university` DROP FOREIGN KEY `FK_d3b5700d08c2113fdcde2e9e35a`',
    );
    await queryRunner.query(
      'ALTER TABLE `zone` DROP FOREIGN KEY `FK_5b545fdb303b329fde24d0d4279`',
    );
    await queryRunner.query(
      'ALTER TABLE `zone` DROP FOREIGN KEY `FK_bbf299b3c534c78fd7896f7df67`',
    );
    await queryRunner.query(
      'ALTER TABLE `restaurant` DROP FOREIGN KEY `FK_848ac5e4e3e511560d07e36a257`',
    );
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_82816cf2eaae947ff6fc15da26d`',
    );
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_5afa7e27cce8bc1b75ea54968c8`',
    );
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_3edfcab660a53a1ac59e0e51911`',
    );
    await queryRunner.query(
      'ALTER TABLE `participant` DROP FOREIGN KEY `FK_7916773e236a9cfc13d59f96a4a`',
    );
    await queryRunner.query(
      'ALTER TABLE `participant` DROP FOREIGN KEY `FK_cf9113dc486e9d53e33807cf6f7`',
    );
    await queryRunner.query(
      'ALTER TABLE `fee` DROP FOREIGN KEY `FK_1415ccec8a50551ed3baad43d72`',
    );
    await queryRunner.query(
      'ALTER TABLE `menu` DROP FOREIGN KEY `FK_a9c5473205703022c7a53a410c2`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_9922406dc7d70e20423aeffadf` ON `auth`',
    );
    await queryRunner.query('DROP TABLE `auth`');
    await queryRunner.query(
      'DROP INDEX `IDX_01eea41349b6c9275aec646eee` ON `user`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP TABLE `region`');
    await queryRunner.query('DROP TABLE `university`');
    await queryRunner.query('DROP TABLE `zone`');
    await queryRunner.query('DROP TABLE `restaurant`');
    await queryRunner.query('DROP TABLE `order`');
    await queryRunner.query('DROP TABLE `participant`');
    await queryRunner.query('DROP TABLE `fee`');
    await queryRunner.query('DROP TABLE `menu`');
    await queryRunner.query('DROP TABLE `category`');
  }
}
