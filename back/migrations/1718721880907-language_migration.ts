import { MigrationInterface, QueryRunner } from "typeorm";

export class LanguageMigration1718721880907 implements MigrationInterface {
    name = 'LanguageMigration1718721880907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "localisation_id" TO "languageId"`);
        await queryRunner.query(`CREATE TABLE "languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "owner_id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "languageId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_43e931f63c91f094d879aeeea29" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_43e931f63c91f094d879aeeea29"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "languageId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "owner_id" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "languages"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "languageId" TO "localisation_id"`);
    }

}
