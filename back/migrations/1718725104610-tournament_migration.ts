import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentMigration1718725104610 implements MigrationInterface {
    name = 'TournamentMigration1718725104610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clubs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "attribute" character varying NOT NULL, "fileLink" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aliance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "attribute" character varying NOT NULL, "fileLink" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_9b847fcce2dece70cea94b1ef02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tournaments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "prizePool" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "players" uuid array NOT NULL, "date_registration" TIMESTAMP NOT NULL, "logo" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "joinCost" integer NOT NULL, "userId" uuid, "clubId" uuid, "alianceId" uuid, CONSTRAINT "PK_6d5d129da7a80cf99e8ad4833a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_type_enum" RENAME TO "transactions_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('deposit', 'withdraw', 'transfer', 'swap', 'joinTable', 'joinTournament')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transactions_type_enum" USING "type"::"text"::"public"."transactions_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_1785d4907599f1662fb41253a72" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_fb5af3083c89a38256aef475de7" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_8106976d22064daaac5894ccf04" FOREIGN KEY ("alianceId") REFERENCES "aliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_8106976d22064daaac5894ccf04"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_fb5af3083c89a38256aef475de7"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_1785d4907599f1662fb41253a72"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum_old" AS ENUM('deposit', 'withdraw', 'transfer', 'swap', 'joinTable')`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "public"."transactions_type_enum_old" USING "type"::"text"::"public"."transactions_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transactions_type_enum_old" RENAME TO "transactions_type_enum"`);
        await queryRunner.query(`DROP TABLE "tournaments"`);
        await queryRunner.query(`DROP TABLE "aliance"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
    }

}
