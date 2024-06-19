import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1718812129988 implements MigrationInterface {
    name = 'FixMigration1718812129988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "allianceId"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "tournamentId"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "gameType"`);
        await queryRunner.query(`DROP TYPE "public"."games_gametype_enum"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "gameMode"`);
        await queryRunner.query(`DROP TYPE "public"."games_gamemode_enum"`);
        await queryRunner.query(`ALTER TABLE "games" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD "alliance_id" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD "tournament_id" uuid`);
        await queryRunner.query(`CREATE TYPE "public"."games_game_type_enum" AS ENUM('sitAndGo', 'cashGame')`);
        await queryRunner.query(`ALTER TABLE "games" ADD "game_type" "public"."games_game_type_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."games_game_mode_enum" AS ENUM('omaha', 'holdem')`);
        await queryRunner.query(`ALTER TABLE "games" ADD "game_mode" "public"."games_game_mode_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "game_mode"`);
        await queryRunner.query(`DROP TYPE "public"."games_game_mode_enum"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "game_type"`);
        await queryRunner.query(`DROP TYPE "public"."games_game_type_enum"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "tournament_id"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "user_id"`);
        await queryRunner.query(`CREATE TYPE "public"."games_gamemode_enum" AS ENUM('omaha', 'holdem')`);
        await queryRunner.query(`ALTER TABLE "games" ADD "gameMode" "public"."games_gamemode_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."games_gametype_enum" AS ENUM('sitAndGo', 'cashGame')`);
        await queryRunner.query(`ALTER TABLE "games" ADD "gameType" "public"."games_gametype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "games" ADD "tournamentId" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD "allianceId" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD "userId" uuid`);
    }

}
