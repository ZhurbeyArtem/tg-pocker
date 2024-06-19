import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1718811952944 implements MigrationInterface {
    name = 'FixMigration1718811952944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_links" DROP CONSTRAINT "FK_62204fb2b88fb6d363119d8d3d9"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" RENAME COLUMN "clubId" TO "club_id"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" RENAME COLUMN "clubId" TO "club_id"`);
        await queryRunner.query(`ALTER TABLE "clubs" RENAME COLUMN "ownerId" TO "owner_id"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "restTimeInMinutes"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "feePercent"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "maxFee"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "betLimit"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "betStep"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "leaveTimeInMinutes"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "accessType"`);
        await queryRunner.query(`DROP TYPE "public"."game_settings_accesstype_enum"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "tableID"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "autoClose"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "totalUsers"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "smallBlind"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "bigBlind"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "minBuyIn"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "maxBuyIn"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "minAddOn"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "maxAddOn"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "maxStack"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "timeDecisionInSeconds"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "roundStage"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "winnerIds"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "bigBlind"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "smallBlind"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "communityCards"`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "total_users" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "small_blind" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "big_blind" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "min_buy_in" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "max_buy_in" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "min_add_on" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "max_add_on" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "max_stack" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "time_decision_in_seconds" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "rest_time_in_minutes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "fee_percent" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "max_fee" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "bet_limit" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "bet_step" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "leave_time_in_minutes" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."game_settings_access_type_enum" AS ENUM('private', 'link', 'club', 'public')`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "access_type" "public"."game_settings_access_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "table_id" uuid`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "auto_close" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "community_cards" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "round_stage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "winner_ids" uuid array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "big_blind" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "small_blind" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invitation_links" ADD CONSTRAINT "FK_3264c06a90262c3a80446a9bc64" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_links" DROP CONSTRAINT "FK_3264c06a90262c3a80446a9bc64"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "small_blind"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "big_blind"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "winner_ids"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "round_stage"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP COLUMN "community_cards"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "auto_close"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "table_id"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "access_type"`);
        await queryRunner.query(`DROP TYPE "public"."game_settings_access_type_enum"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "leave_time_in_minutes"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "bet_step"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "bet_limit"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "max_fee"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "fee_percent"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "rest_time_in_minutes"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "time_decision_in_seconds"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "max_stack"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "max_add_on"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "min_add_on"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "max_buy_in"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "min_buy_in"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "big_blind"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "small_blind"`);
        await queryRunner.query(`ALTER TABLE "game_settings" DROP COLUMN "total_users"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "communityCards" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "smallBlind" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "bigBlind" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "winnerIds" uuid array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD "roundStage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "timeDecisionInSeconds" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "maxStack" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "maxAddOn" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "minAddOn" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "maxBuyIn" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "minBuyIn" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "bigBlind" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "smallBlind" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "totalUsers" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "autoClose" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "tableID" uuid`);
        await queryRunner.query(`CREATE TYPE "public"."game_settings_accesstype_enum" AS ENUM('private', 'link', 'club', 'public')`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "accessType" "public"."game_settings_accesstype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "leaveTimeInMinutes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "betStep" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "betLimit" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "maxFee" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "feePercent" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game_settings" ADD "restTimeInMinutes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clubs" RENAME COLUMN "owner_id" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" RENAME COLUMN "club_id" TO "clubId"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" RENAME COLUMN "club_id" TO "clubId"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" ADD CONSTRAINT "FK_62204fb2b88fb6d363119d8d3d9" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
