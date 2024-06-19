import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1718720328421 implements MigrationInterface {
    name = 'UserMigration1718720328421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('player', 'clubAdmin', 'clubUser', 'admin', 'clubModer')`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('normal', 'kicked', 'banned', 'bannedWithMoney')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."users_role_enum" array NOT NULL DEFAULT '{player}', "nickname" character varying(50) NOT NULL, "lvl" integer NOT NULL, "rank" integer NOT NULL, "status" "public"."users_status_enum" NOT NULL DEFAULT 'normal', "status_reason" character varying, "banned_by" uuid, "created_at" character varying NOT NULL, "tg_username" character varying NOT NULL, "tg_user_id" uuid NOT NULL, "avatar" character varying NOT NULL, "best_hand" character varying array, "total_games" text NOT NULL, "friends" uuid array NOT NULL, "localisation_id" uuid NOT NULL, "club_id" uuid NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
