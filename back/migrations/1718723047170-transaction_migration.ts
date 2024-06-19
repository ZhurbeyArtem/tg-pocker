import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionMigration1718723047170 implements MigrationInterface {
    name = 'TransactionMigration1718723047170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_type_enum" AS ENUM('deposit', 'withdraw', 'transfer', 'swap', 'joinTable')`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_status_enum" AS ENUM('pending', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."transactions_type_enum" NOT NULL, "send_at" TIMESTAMP NOT NULL, "amount" double precision NOT NULL, "address" character varying NOT NULL, "currency" integer NOT NULL, "status" "public"."transactions_status_enum" NOT NULL, "completed_at" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "nickname"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "attribute" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "fileLink" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "fileLink"`);
        await queryRunner.query(`ALTER TABLE "languages" DROP COLUMN "attribute"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "balance" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "languages" ADD "nickname" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_type_enum"`);
    }

}
