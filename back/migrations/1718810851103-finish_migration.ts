import { MigrationInterface, QueryRunner } from "typeorm";

export class FinishMigration1718810851103 implements MigrationInterface {
    name = 'FinishMigration1718810851103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_b0110cbc54fcec222c6fe54760f"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_36d5bc0380695786dbc7599d72e"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_65521e85f8a5e75caed572f4e6f"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "allianceId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "tournamentId"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "alliance_id" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "tournament_id" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3000dad1da61b29953f07476324" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3e306e7c86b21da9d2583d5eb75" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_e54b3f7bf38eaa8ccafb995e78f" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_96ccc7b02dfad66b443a519ff35" FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_96ccc7b02dfad66b443a519ff35"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_e54b3f7bf38eaa8ccafb995e78f"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3e306e7c86b21da9d2583d5eb75"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3000dad1da61b29953f07476324"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "tournament_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "tournamentId" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "allianceId" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_65521e85f8a5e75caed572f4e6f" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_36d5bc0380695786dbc7599d72e" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_b0110cbc54fcec222c6fe54760f" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
