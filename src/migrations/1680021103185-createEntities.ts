import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1680021103185 implements MigrationInterface {
    name = 'createEntities1680021103185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(120) NOT NULL, "email" varchar(100) NOT NULL, "cellphone" varchar(12) NOT NULL, "password" varchar(100) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_65964723c91566b00580a6cf222" UNIQUE ("cellphone"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(120) NOT NULL, "email" varchar(100) NOT NULL, "cellphone" varchar(12) NOT NULL, "insertedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_8a049c7f44f6ebb2f583ef54deb" UNIQUE ("cellphone"))`);
        await queryRunner.query(`CREATE TABLE "temporary_contact" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(120) NOT NULL, "email" varchar(100) NOT NULL, "cellphone" varchar(12) NOT NULL, "insertedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_8a049c7f44f6ebb2f583ef54deb" UNIQUE ("cellphone"), CONSTRAINT "FK_e7e34fa8e409e9146f4729fd0cb" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_contact"("id", "name", "email", "cellphone", "insertedAt", "userId") SELECT "id", "name", "email", "cellphone", "insertedAt", "userId" FROM "contact"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`ALTER TABLE "temporary_contact" RENAME TO "contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME TO "temporary_contact"`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(120) NOT NULL, "email" varchar(100) NOT NULL, "cellphone" varchar(12) NOT NULL, "insertedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_8a049c7f44f6ebb2f583ef54deb" UNIQUE ("cellphone"))`);
        await queryRunner.query(`INSERT INTO "contact"("id", "name", "email", "cellphone", "insertedAt", "userId") SELECT "id", "name", "email", "cellphone", "insertedAt", "userId" FROM "temporary_contact"`);
        await queryRunner.query(`DROP TABLE "temporary_contact"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
