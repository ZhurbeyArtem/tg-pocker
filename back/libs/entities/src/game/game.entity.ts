import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameSettings } from '../game/gameSettings.entity';
import { GameRounds } from './gameRounds.entity';

enum GameType {
  sitAndGo = 'sitAndGo',
  cashGame = 'cashGame',
}

enum GameMode {
  omaha = 'omaha',
  holdem = 'holdem',
}

enum Status {
  active = 'active',
  inactive = 'inactive',
}

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'simple-json' })
  players: {
    userId: string;
    balance: number;
  }[];

  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'uuid', array: true })
  spectators: string[];

  @Column({ type: 'uuid', nullable: true, name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', nullable: true, name: 'alliance_id' })
  allianceId: string;

  @Column({ type: 'uuid', nullable: true, name: 'club_id' })
  clubId: string;

  @Column({ type: 'uuid', nullable: true, name: 'tournament_id' })
  tournamentId: string;

  @Column({ type: 'enum', enum: GameType, name: 'game_type' })
  gameType: GameType;

  @Column({ type: 'enum', enum: GameMode, name: 'game_mode' })
  gameMode: GameMode;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @OneToOne(() => GameSettings)
  @JoinColumn({ name: 'game_settings_id' })
  settings: GameSettings;

  @OneToMany(() => GameRounds, (gameRound) => gameRound.game)
  gameRounds: GameRounds[];
}
