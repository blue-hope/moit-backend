import {MigrationInterface, QueryRunner} from "typeorm";

export class createMemo1613999981570 implements MigrationInterface {
    name = 'createMemo1613999981570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "memo" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "boardId" integer, "userId" integer, CONSTRAINT "PK_612b46ac33a01fda3efb085302d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "memo" ADD CONSTRAINT "FK_b42f1a9edae6b4f505adce59518" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "memo" ADD CONSTRAINT "FK_4e7b587791c6bd79494072dfe97" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memo" DROP CONSTRAINT "FK_4e7b587791c6bd79494072dfe97"`);
        await queryRunner.query(`ALTER TABLE "memo" DROP CONSTRAINT "FK_b42f1a9edae6b4f505adce59518"`);
        await queryRunner.query(`DROP TABLE "memo"`);
    }

}
