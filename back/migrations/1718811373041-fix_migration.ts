import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1718811373041 implements MigrationInterface {
    name = 'FixMigration1718811373041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_3ad088334dae246604b741457f5"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP CONSTRAINT "FK_fcea56b4ba60dd7d8e22edbac6e"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP CONSTRAINT "FK_12bc5c2a44cc44d4a9eb110b0d5"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP CONSTRAINT "FK_62103c4b212dbb15f435cfab8b1"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP CONSTRAINT "FK_d21f4917bf417ec26eb4b4bbc98"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP CONSTRAINT "FK_0ee3b4334cb6619490976a40fb3"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" DROP CONSTRAINT "FK_dc86f79e280d386c6ea834505d8"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_27094e868b20a99da11466e64f8"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_c9ba00bcb8819ab67f463b78d68"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" DROP CONSTRAINT "FK_5f4492f6a5823e4815ce7e34434"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP CONSTRAINT "FK_cfaf89506a2f025f5b365ddc00d"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP CONSTRAINT "FK_78ea6c5659f2e5e9809eed96713"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_6725be92eeab72e7950171fb953"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_cd0b666da072cd45d13444136bb"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_1785d4907599f1662fb41253a72"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_fb5af3083c89a38256aef475de7"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_dfe4c91f71a5024ac970c1171bb"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_e10b044961d38674a31c160116b"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_43e931f63c91f094d879aeeea29"`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" DROP CONSTRAINT "FK_8311670c8ea8a001b93acb9e245"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP CONSTRAINT "FK_98aa57df9358d2ddc207fc6a01b"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP CONSTRAINT "FK_7412a026d08fad99d5529afbda0"`);
        await queryRunner.query(`ALTER TABLE "games" RENAME COLUMN "settingsId" TO "game_settings_id"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" RENAME COLUMN "gameId" TO "game_id"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" RENAME COLUMN "allianceId" TO "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" RENAME COLUMN "allianceId" TO "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "languageId" TO "language_id"`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" RENAME COLUMN "userRoundId" TO "user_round_id"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "allianceId"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP COLUMN "allianceId"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "UQ_6725be92eeab72e7950171fb953"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP COLUMN "settingsId"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP COLUMN "allianceId"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "clubId"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "allianceId"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "UQ_e10b044961d38674a31c160116b"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "settingsId"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "gameRoundsId"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "news" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "news" ADD "alliance_id" uuid`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD "alliance_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD "alliance_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD "club_settings_id" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "UQ_9b25701f305e4688b18fafc27e5" UNIQUE ("club_settings_id")`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "club_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "alliance_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "tournament_settings_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "UQ_431188d34a5e9ff3ee21e9a193f" UNIQUE ("tournament_settings_id")`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "game_rounds_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_e3cd333fccf42fad9f5ae27f004" FOREIGN KEY ("game_settings_id") REFERENCES "game_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD CONSTRAINT "FK_6fd8a3b93727d233ab7f9e88e1e" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD CONSTRAINT "FK_b7b980c81ab60e265ea5d925f2f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD CONSTRAINT "FK_bdf8adf47d289e1539280920857" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD CONSTRAINT "FK_95402b18fc117773093e64b91df" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD CONSTRAINT "FK_13153115f2606828831fd97fa57" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation_links" ADD CONSTRAINT "FK_3e6bf8bd491f1589f618d9b36b3" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_2de0df34aaf7a185432ecc67332" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_3aed87bea7b79b9d1dd85551fc5" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" ADD CONSTRAINT "FK_4d8887cee41ab5fac497a2e9417" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD CONSTRAINT "FK_4b6417243e761801c97a9126391" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD CONSTRAINT "FK_74d2d3cd892713f14de88289c97" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_4460d1f8075040e2fabac80d659" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_9b25701f305e4688b18fafc27e5" FOREIGN KEY ("club_settings_id") REFERENCES "club_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_670ed1781be34ec30d0b6c73c29" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_284ced15f09286d580150efcbea" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_256eadfcedbc54c8ff2660bbdea" FOREIGN KEY ("alliance_id") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_431188d34a5e9ff3ee21e9a193f" FOREIGN KEY ("tournament_settings_id") REFERENCES "tournament_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5467acf58b481907933d4eaf046" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" ADD CONSTRAINT "FK_9bab6b518a20d043bf0b33dae26" FOREIGN KEY ("user_round_id") REFERENCES "user_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD CONSTRAINT "FK_d7bf84120e426f17a3fcd656156" FOREIGN KEY ("game_rounds_id") REFERENCES "game_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD CONSTRAINT "FK_0e90a3136c3250cf979494bf315" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP CONSTRAINT "FK_0e90a3136c3250cf979494bf315"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP CONSTRAINT "FK_d7bf84120e426f17a3fcd656156"`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" DROP CONSTRAINT "FK_9bab6b518a20d043bf0b33dae26"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5467acf58b481907933d4eaf046"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_431188d34a5e9ff3ee21e9a193f"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_256eadfcedbc54c8ff2660bbdea"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_284ced15f09286d580150efcbea"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "FK_670ed1781be34ec30d0b6c73c29"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_9b25701f305e4688b18fafc27e5"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_4460d1f8075040e2fabac80d659"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP CONSTRAINT "FK_74d2d3cd892713f14de88289c97"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP CONSTRAINT "FK_4b6417243e761801c97a9126391"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" DROP CONSTRAINT "FK_4d8887cee41ab5fac497a2e9417"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_3aed87bea7b79b9d1dd85551fc5"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_2de0df34aaf7a185432ecc67332"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" DROP CONSTRAINT "FK_3e6bf8bd491f1589f618d9b36b3"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP CONSTRAINT "FK_13153115f2606828831fd97fa57"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP CONSTRAINT "FK_95402b18fc117773093e64b91df"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP CONSTRAINT "FK_bdf8adf47d289e1539280920857"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP CONSTRAINT "FK_b7b980c81ab60e265ea5d925f2f"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" DROP CONSTRAINT "FK_6fd8a3b93727d233ab7f9e88e1e"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_e3cd333fccf42fad9f5ae27f004"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" DROP COLUMN "game_rounds_id"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP CONSTRAINT "UQ_431188d34a5e9ff3ee21e9a193f"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "tournament_settings_id"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "tournaments" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "UQ_9b25701f305e4688b18fafc27e5"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP COLUMN "club_settings_id"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP COLUMN "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP COLUMN "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "alliance_id"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP COLUMN "club_id"`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD "gameRoundsId" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "settingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "UQ_e10b044961d38674a31c160116b" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "allianceId" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD "allianceId" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD "settingsId" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "UQ_6725be92eeab72e7950171fb953" UNIQUE ("settingsId")`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD "allianceId" uuid`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "news" ADD "allianceId" uuid`);
        await queryRunner.query(`ALTER TABLE "news" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD "clubId" uuid`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" RENAME COLUMN "user_round_id" TO "userRoundId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "language_id" TO "languageId"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" RENAME COLUMN "alliance_id" TO "allianceId"`);
        await queryRunner.query(`ALTER TABLE "invitation_links" RENAME COLUMN "alliance_id" TO "allianceId"`);
        await queryRunner.query(`ALTER TABLE "game_rounds" RENAME COLUMN "game_id" TO "gameId"`);
        await queryRunner.query(`ALTER TABLE "games" RENAME COLUMN "game_settings_id" TO "settingsId"`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD CONSTRAINT "FK_7412a026d08fad99d5529afbda0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rounds" ADD CONSTRAINT "FK_98aa57df9358d2ddc207fc6a01b" FOREIGN KEY ("gameRoundsId") REFERENCES "game_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_round_actions" ADD CONSTRAINT "FK_8311670c8ea8a001b93acb9e245" FOREIGN KEY ("userRoundId") REFERENCES "user_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_43e931f63c91f094d879aeeea29" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_e10b044961d38674a31c160116b" FOREIGN KEY ("settingsId") REFERENCES "tournament_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_dfe4c91f71a5024ac970c1171bb" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_fb5af3083c89a38256aef475de7" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tournaments" ADD CONSTRAINT "FK_1785d4907599f1662fb41253a72" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_cd0b666da072cd45d13444136bb" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_6725be92eeab72e7950171fb953" FOREIGN KEY ("settingsId") REFERENCES "club_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD CONSTRAINT "FK_78ea6c5659f2e5e9809eed96713" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alliances_invitation" ADD CONSTRAINT "FK_cfaf89506a2f025f5b365ddc00d" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alliance_owners" ADD CONSTRAINT "FK_5f4492f6a5823e4815ce7e34434" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_c9ba00bcb8819ab67f463b78d68" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_27094e868b20a99da11466e64f8" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation_links" ADD CONSTRAINT "FK_dc86f79e280d386c6ea834505d8" FOREIGN KEY ("allianceId") REFERENCES "alliance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD CONSTRAINT "FK_0ee3b4334cb6619490976a40fb3" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_banned_and_kicked_users" ADD CONSTRAINT "FK_d21f4917bf417ec26eb4b4bbc98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD CONSTRAINT "FK_62103c4b212dbb15f435cfab8b1" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs_invitation" ADD CONSTRAINT "FK_12bc5c2a44cc44d4a9eb110b0d5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_rounds" ADD CONSTRAINT "FK_fcea56b4ba60dd7d8e22edbac6e" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_3ad088334dae246604b741457f5" FOREIGN KEY ("settingsId") REFERENCES "game_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}