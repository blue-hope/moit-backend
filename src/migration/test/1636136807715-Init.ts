import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1636136807715 implements MigrationInterface {
    name = 'Init1636136807715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "imageKey" varchar NOT NULL, "restaurantId" integer)`);
        await queryRunner.query(`CREATE TABLE "fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceStart" integer NOT NULL, "priceEnd" integer NOT NULL, "deliveryFee" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurantId" integer)`);
        await queryRunner.query(`CREATE TABLE "participant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurantId" integer, "creatorId" integer, "feeId" integer)`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "account" varchar NOT NULL, "open_at" datetime NOT NULL, "close_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer)`);
        await queryRunner.query(`CREATE TABLE "zone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "universityId" integer, "restaurantId" integer)`);
        await queryRunner.query(`CREATE TABLE "university" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "regionId" integer)`);
        await queryRunner.query(`CREATE TABLE "region" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "regionId" integer, "universityId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "imageKey" varchar NOT NULL, "restaurantId" integer, CONSTRAINT "FK_085156de3c3a44eba017a6a0846" FOREIGN KEY ("restaurantId") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_menu"("id", "title", "price", "imageKey", "restaurantId") SELECT "id", "title", "price", "imageKey", "restaurantId" FROM "menu"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`ALTER TABLE "temporary_menu" RENAME TO "menu"`);
        await queryRunner.query(`CREATE TABLE "temporary_fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceStart" integer NOT NULL, "priceEnd" integer NOT NULL, "deliveryFee" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurantId" integer, CONSTRAINT "FK_db46620d4f07521608ff239ffd7" FOREIGN KEY ("restaurantId") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_fee"("id", "priceStart", "priceEnd", "deliveryFee", "created_at", "updated_at", "restaurantId") SELECT "id", "priceStart", "priceEnd", "deliveryFee", "created_at", "updated_at", "restaurantId" FROM "fee"`);
        await queryRunner.query(`DROP TABLE "fee"`);
        await queryRunner.query(`ALTER TABLE "temporary_fee" RENAME TO "fee"`);
        await queryRunner.query(`CREATE TABLE "temporary_participant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer, "userId" integer, CONSTRAINT "FK_8ca0a4c9a2c1e83a88aaeef77ef" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_b915e97dea27ffd1e40c8003b3b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_participant"("id", "created_at", "updated_at", "orderId", "userId") SELECT "id", "created_at", "updated_at", "orderId", "userId" FROM "participant"`);
        await queryRunner.query(`DROP TABLE "participant"`);
        await queryRunner.query(`ALTER TABLE "temporary_participant" RENAME TO "participant"`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurantId" integer, "creatorId" integer, "feeId" integer, CONSTRAINT "FK_c93f22720c77241d2476c07cabf" FOREIGN KEY ("restaurantId") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_b4a453bc5f19e415c3e62fa8122" FOREIGN KEY ("creatorId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_7b3903996005600bf0b9736ea75" FOREIGN KEY ("feeId") REFERENCES "fee" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "title", "content", "created_at", "updated_at", "restaurantId", "creatorId", "feeId") SELECT "id", "title", "content", "created_at", "updated_at", "restaurantId", "creatorId", "feeId" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "account" varchar NOT NULL, "open_at" datetime NOT NULL, "close_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "FK_735a127e301c95ee77eb7ff83f1" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_restaurant"("id", "account", "open_at", "close_at", "created_at", "updated_at", "categoryId") SELECT "id", "account", "open_at", "close_at", "created_at", "updated_at", "categoryId" FROM "restaurant"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`ALTER TABLE "temporary_restaurant" RENAME TO "restaurant"`);
        await queryRunner.query(`CREATE TABLE "temporary_zone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "universityId" integer, "restaurantId" integer, CONSTRAINT "FK_1ebcca4a167a96189aa28e3a3af" FOREIGN KEY ("universityId") REFERENCES "university" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2ce00aefbcdbf54832030017a07" FOREIGN KEY ("restaurantId") REFERENCES "restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_zone"("id", "created_at", "updated_at", "universityId", "restaurantId") SELECT "id", "created_at", "updated_at", "universityId", "restaurantId" FROM "zone"`);
        await queryRunner.query(`DROP TABLE "zone"`);
        await queryRunner.query(`ALTER TABLE "temporary_zone" RENAME TO "zone"`);
        await queryRunner.query(`CREATE TABLE "temporary_university" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "regionId" integer, CONSTRAINT "FK_5f190cfd4f233d92bb7e4998749" FOREIGN KEY ("regionId") REFERENCES "region" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_university"("id", "name", "regionId") SELECT "id", "name", "regionId" FROM "university"`);
        await queryRunner.query(`DROP TABLE "university"`);
        await queryRunner.query(`ALTER TABLE "temporary_university" RENAME TO "university"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "regionId" integer, "universityId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"), CONSTRAINT "FK_f1a2565b8f2580a146871cf1142" FOREIGN KEY ("regionId") REFERENCES "region" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_66d49e45ca25a0716c0db15572f" FOREIGN KEY ("universityId") REFERENCES "university" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "name", "phoneNumber", "created_at", "updated_at", "regionId", "universityId") SELECT "id", "email", "name", "phoneNumber", "created_at", "updated_at", "regionId", "universityId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "regionId" integer, "universityId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "name", "phoneNumber", "created_at", "updated_at", "regionId", "universityId") SELECT "id", "email", "name", "phoneNumber", "created_at", "updated_at", "regionId", "universityId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "university" RENAME TO "temporary_university"`);
        await queryRunner.query(`CREATE TABLE "university" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "regionId" integer)`);
        await queryRunner.query(`INSERT INTO "university"("id", "name", "regionId") SELECT "id", "name", "regionId" FROM "temporary_university"`);
        await queryRunner.query(`DROP TABLE "temporary_university"`);
        await queryRunner.query(`ALTER TABLE "zone" RENAME TO "temporary_zone"`);
        await queryRunner.query(`CREATE TABLE "zone" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "universityId" integer, "restaurantId" integer)`);
        await queryRunner.query(`INSERT INTO "zone"("id", "created_at", "updated_at", "universityId", "restaurantId") SELECT "id", "created_at", "updated_at", "universityId", "restaurantId" FROM "temporary_zone"`);
        await queryRunner.query(`DROP TABLE "temporary_zone"`);
        await queryRunner.query(`ALTER TABLE "restaurant" RENAME TO "temporary_restaurant"`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "account" varchar NOT NULL, "open_at" datetime NOT NULL, "close_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer)`);
        await queryRunner.query(`INSERT INTO "restaurant"("id", "account", "open_at", "close_at", "created_at", "updated_at", "categoryId") SELECT "id", "account", "open_at", "close_at", "created_at", "updated_at", "categoryId" FROM "temporary_restaurant"`);
        await queryRunner.query(`DROP TABLE "temporary_restaurant"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurantId" integer, "creatorId" integer, "feeId" integer)`);
        await queryRunner.query(`INSERT INTO "order"("id", "title", "content", "created_at", "updated_at", "restaurantId", "creatorId", "feeId") SELECT "id", "title", "content", "created_at", "updated_at", "restaurantId", "creatorId", "feeId" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`ALTER TABLE "participant" RENAME TO "temporary_participant"`);
        await queryRunner.query(`CREATE TABLE "participant" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orderId" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "participant"("id", "created_at", "updated_at", "orderId", "userId") SELECT "id", "created_at", "updated_at", "orderId", "userId" FROM "temporary_participant"`);
        await queryRunner.query(`DROP TABLE "temporary_participant"`);
        await queryRunner.query(`ALTER TABLE "fee" RENAME TO "temporary_fee"`);
        await queryRunner.query(`CREATE TABLE "fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceStart" integer NOT NULL, "priceEnd" integer NOT NULL, "deliveryFee" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "restaurantId" integer)`);
        await queryRunner.query(`INSERT INTO "fee"("id", "priceStart", "priceEnd", "deliveryFee", "created_at", "updated_at", "restaurantId") SELECT "id", "priceStart", "priceEnd", "deliveryFee", "created_at", "updated_at", "restaurantId" FROM "temporary_fee"`);
        await queryRunner.query(`DROP TABLE "temporary_fee"`);
        await queryRunner.query(`ALTER TABLE "menu" RENAME TO "temporary_menu"`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "price" integer NOT NULL, "imageKey" varchar NOT NULL, "restaurantId" integer)`);
        await queryRunner.query(`INSERT INTO "menu"("id", "title", "price", "imageKey", "restaurantId") SELECT "id", "title", "price", "imageKey", "restaurantId" FROM "temporary_menu"`);
        await queryRunner.query(`DROP TABLE "temporary_menu"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "university"`);
        await queryRunner.query(`DROP TABLE "zone"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "participant"`);
        await queryRunner.query(`DROP TABLE "fee"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
