import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationMigration1718785120325 implements MigrationInterface {
    name = 'NotificationMigration1718785120325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_0a9e27765f1e133f560b8575670"`);
        await queryRunner.query(`ALTER TABLE "clubs" RENAME COLUMN "allianceOwnerId" TO "allianceId"`);
        await queryRunner.query(`ALTER TABLE "clubs" RENAME CONSTRAINT "UQ_0a9e27765f1e133f560b8575670" TO "UQ_cd0b666da072cd45d13444136bb"`);
        await queryRunner.query(`ALTER TABLE "tournaments" RENAME COLUMN "prizePool" TO "prize_pool"`);
        await queryRunner.query(`CREATE TYPE "public"."notification_status_enum" AS ENUM('err', 'success', 'inProgress')`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('neutral', 'error', 'progress', 'success', 'news', 'invite')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "status" "public"."notification_status_enum" NOT NULL, "ClubIds" uuid array, "AlienceIds" uuid array, "usersIds" uuid array, "created_at" TIMESTAMP NOT NULL, "type" "public"."notification_type_enum" NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alliance" DROP COLUMN "coinRation"`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" DROP COLUMN "typeOfGame"`);
        await queryRunner.query(`DROP TYPE "public"."tournament_settings_typeofgame_enum"`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" DROP COLUMN "prizeDistribution"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" ADD "clubId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "alliance" ADD "chat_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "alliance" ADD "channel_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "alliance" ADD "coin_ration" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."tournament_settings_type_of_game_enum" AS ENUM('texas', 'ohama')`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" ADD "type_of_game" "public"."tournament_settings_type_of_game_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" ADD "prize_distribution" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "UQ_cd0b666da072cd45d13444136bb"`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_cd0b666da072cd45d13444136bb" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_cd0b666da072cd45d13444136bb"`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "UQ_cd0b666da072cd45d13444136bb" UNIQUE ("allianceId")`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" DROP COLUMN "prize_distribution"`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" DROP COLUMN "type_of_game"`);
        await queryRunner.query(`DROP TYPE "public"."tournament_settings_type_of_game_enum"`);
        await queryRunner.query(`ALTER TABLE "alliance" DROP COLUMN "coin_ration"`);
        await queryRunner.query(`ALTER TABLE "alliance" DROP COLUMN "channel_link"`);
        await queryRunner.query(`ALTER TABLE "alliance" DROP COLUMN "chat_link"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" ADD "prizeDistribution" text NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."tournament_settings_typeofgame_enum" AS ENUM('texas', 'ohama')`);
        await queryRunner.query(`ALTER TABLE "tournament_settings" ADD "typeOfGame" "public"."tournament_settings_typeofgame_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "alliance" ADD "coinRation" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_status_enum"`);
        await queryRunner.query(`ALTER TABLE "tournaments" RENAME COLUMN "prize_pool" TO "prizePool"`);
        await queryRunner.query(`ALTER TABLE "clubs" RENAME CONSTRAINT "UQ_cd0b666da072cd45d13444136bb" TO "UQ_0a9e27765f1e133f560b8575670"`);
        await queryRunner.query(`ALTER TABLE "clubs" RENAME COLUMN "allianceId" TO "allianceOwnerId"`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_0a9e27765f1e133f560b8575670" FOREIGN KEY ("allianceOwnerId") REFERENCES "alliance_owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
