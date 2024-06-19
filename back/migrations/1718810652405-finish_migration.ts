import { MigrationInterface, QueryRunner } from "typeorm";

export class FinishMigration1718810652405 implements MigrationInterface {
    name = 'FinishMigration1718810652405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."game_settings_accesstype_enum" AS ENUM('private', 'link', 'club', 'public')`);
        await queryRunner.query(`CREATE TABLE "game_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalUsers" integer NOT NULL, "smallBlind" integer NOT NULL, "bigBlind" integer NOT NULL, "ante" integer NOT NULL, "minBuyIn" integer NOT NULL, "maxBuyIn" integer NOT NULL, "minAddOn" integer NOT NULL, "maxAddOn" integer NOT NULL, "stack" integer NOT NULL, "maxStack" integer NOT NULL, "timeDecisionInSeconds" integer NOT NULL, "restTimeInMinutes" integer NOT NULL, "feePercent" integer NOT NULL, "maxFee" integer NOT NULL, "betLimit" boolean NOT NULL, "betStep" integer NOT NULL, "leaveTimeInMinutes" integer NOT NULL, "accessType" "public"."game_settings_accesstype_enum" NOT NULL, "tableID" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "autoClose" boolean NOT NULL, CONSTRAINT "PK_5f5f014c6f2d5062bbb738d6ffb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."games_gametype_enum" AS ENUM('sitAndGo', 'cashGame')`);
        await queryRunner.query(`CREATE TYPE "public"."games_gamemode_enum" AS ENUM('omaha', 'holdem')`);
        await queryRunner.query(`CREATE TYPE "public"."games_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "players" text NOT NULL, "link" character varying, "name" character varying NOT NULL, "spectators" uuid array NOT NULL, "userId" uuid, "allianceId" uuid, "clubId" uuid, "tournamentId" uuid, "gameType" "public"."games_gametype_enum" NOT NULL, "gameMode" "public"."games_gamemode_enum" NOT NULL, "status" "public"."games_status_enum" NOT NULL, "settingsId" uuid, CONSTRAINT "REL_3ad088334dae246604b741457f" UNIQUE ("settingsId"), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_rounds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "communityCards" character varying array NOT NULL, "deck" character varying array NOT NULL, "pot" integer NOT NULL, "roundStage" integer NOT NULL, "players" uuid array NOT NULL, "winnerIds" uuid array NOT NULL, "bigBlind" uuid NOT NULL, "smallBlind" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "gameId" uuid, CONSTRAINT "PK_9f9de91990bb512595f1058b98c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_rounds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL, "cards" character varying array NOT NULL, "combination" character varying NOT NULL, "placeNumber" integer NOT NULL, "roundStage" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "gameRoundsId" uuid, "userId" uuid, CONSTRAINT "PK_d6463312143321898be4dc601ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_round_actions_action_enum" AS ENUM('BET', 'COLL', 'RAISE', 'BLIND', 'ANTE', 'FOLD', 'CHECK')`);
        await queryRunner.query(`CREATE TABLE "user_round_actions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "action" "public"."user_round_actions_action_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userRoundId" uuid, CONSTRAINT "PK_de3d50b80207c78f814be690857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "club_settings" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "invitation_links" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "alliance" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clubs" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tournaments" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "languages" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_3ad088334dae246604b741457f5" FOREIGN KEY ("settingsId") REFERENCES "game_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD CONSTRAINT "FK_fcea56b4ba60dd7d8e22edbac6e" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD CONSTRAINT "FK_98aa57df9358d2ddc207fc6a01b" FOREIGN KEY ("gameRoundsId") REFERENCES "game_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD CONSTRAINT "FK_7412a026d08fad99d5529afbda0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" ADD CONSTRAINT "FK_8311670c8ea8a001b93acb9e245" FOREIGN KEY ("userRoundId") REFERENCES "user_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_round_actions" DROP CONSTRAINT "FK_8311670c8ea8a001b93acb9e245"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP CONSTRAINT "FK_7412a026d08fad99d5529afbda0"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP CONSTRAINT "FK_98aa57df9358d2ddc207fc6a01b"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP CONSTRAINT "FK_fcea56b4ba60dd7d8e22edbac6e"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_3ad088334dae246604b741457f5"`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "languages" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tournaments" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clubs" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "alliance" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "invitation_links" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "club_settings" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "user_round_actions"`);
        await queryRunner.query(`DROP TYPE "public"."user_round_actions_action_enum"`);
        await queryRunner.query(`DROP TABLE "user_rounds"`);
        await queryRunner.query(`DROP TABLE "game_rounds"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TYPE "public"."games_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."games_gamemode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."games_gametype_enum"`);
        await queryRunner.query(`DROP TABLE "game_settings"`);
        await queryRunner.query(`DROP TYPE "public"."game_settings_accesstype_enum"`);
    }

}
