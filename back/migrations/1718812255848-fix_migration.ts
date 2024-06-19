import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1718812255848 implements MigrationInterface {
    name = 'FixMigration1718812255848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "placeNumber"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "roundStage"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "place_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "round_number" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "round_number"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "place_number"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "roundStage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "placeNumber" integer NOT NULL`);
    }

}
