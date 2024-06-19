import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1718785546399 implements MigrationInterface {
    name = 'FixMigration1718785546399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "languages" RENAME COLUMN "fileLink" TO "file_link"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "ClubIds"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "AlienceIds"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "usersIds"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "club_ids" uuid array`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "alliance_ids" uuid array`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "user_ids" uuid array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "user_ids"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "alliance_ids"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "club_ids"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "usersIds" uuid array`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "AlienceIds" uuid array`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "ClubIds" uuid array`);
        await queryRunner.query(`ALTER TABLE "languages" RENAME COLUMN "file_link" TO "fileLink"`);
    }

}
