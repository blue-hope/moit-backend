import { MigrationInterface, QueryRunner } from 'typeorm';

export class add1612204279627 implements MigrationInterface {
  name = 'add1612204279627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "groupId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "provider" varchar NOT NULL DEFAULT ('local'), "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "start_at" datetime NOT NULL, "end_at" datetime NOT NULL, "description" text, "latitude" float NOT NULL, "longitude" float NOT NULL, "is_dummy" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "boardId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "start_at" datetime NOT NULL, "end_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "groupId" integer, CONSTRAINT "FK_3d6b372788ab01be58853003c93" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_31e541c93fdc0bb63cfde6549b7" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_group"("id", "created_at", "updated_at", "userId", "groupId") SELECT "id", "created_at", "updated_at", "userId", "groupId" FROM "user_group"`,
    );
    await queryRunner.query(`DROP TABLE "user_group"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_group" RENAME TO "user_group"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "provider" varchar NOT NULL DEFAULT ('local'), "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"), CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_auth"("id", "password", "salt", "provider", "user_id") SELECT "id", "password", "salt", "provider", "user_id" FROM "auth"`,
    );
    await queryRunner.query(`DROP TABLE "auth"`);
    await queryRunner.query(`ALTER TABLE "temporary_auth" RENAME TO "auth"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_plan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "start_at" datetime NOT NULL, "end_at" datetime NOT NULL, "description" text, "latitude" float NOT NULL, "longitude" float NOT NULL, "is_dummy" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "boardId" integer, CONSTRAINT "FK_b99bc868ea31aa44026593d1841" FOREIGN KEY ("boardId") REFERENCES "board" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_plan"("id", "title", "start_at", "end_at", "description", "latitude", "longitude", "is_dummy", "created_at", "updated_at", "boardId") SELECT "id", "title", "start_at", "end_at", "description", "latitude", "longitude", "is_dummy", "created_at", "updated_at", "boardId" FROM "plan"`,
    );
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`ALTER TABLE "temporary_plan" RENAME TO "plan"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "plan" RENAME TO "temporary_plan"`);
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "start_at" datetime NOT NULL, "end_at" datetime NOT NULL, "description" text, "latitude" float NOT NULL, "longitude" float NOT NULL, "is_dummy" boolean NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "boardId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "plan"("id", "title", "start_at", "end_at", "description", "latitude", "longitude", "is_dummy", "created_at", "updated_at", "boardId") SELECT "id", "title", "start_at", "end_at", "description", "latitude", "longitude", "is_dummy", "created_at", "updated_at", "boardId" FROM "temporary_plan"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_plan"`);
    await queryRunner.query(`ALTER TABLE "auth" RENAME TO "temporary_auth"`);
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "salt" varchar NOT NULL, "provider" varchar NOT NULL DEFAULT ('local'), "user_id" integer, CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "auth"("id", "password", "salt", "provider", "user_id") SELECT "id", "password", "salt", "provider", "user_id" FROM "temporary_auth"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_auth"`);
    await queryRunner.query(
      `ALTER TABLE "user_group" RENAME TO "temporary_user_group"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "groupId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "user_group"("id", "created_at", "updated_at", "userId", "groupId") SELECT "id", "created_at", "updated_at", "userId", "groupId" FROM "temporary_user_group"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user_group"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`DROP TABLE "auth"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_group"`);
    await queryRunner.query(`DROP TABLE "group"`);
  }
}
