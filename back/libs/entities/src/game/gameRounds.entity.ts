import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Game } from './game.entity';
import { UserRound } from '../user/userRound.entity';

@Entity('game_rounds')
export class GameRounds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { array: true, name: 'community_cards' })
  communityCards: string[];

  @Column('varchar', { array: true })
  deck: string[];

  @Column('int')
  pot: number;

  @Column('int', { name: 'round_stage' })
  roundStage: number;

  @Column('uuid', { array: true })
  players: string[];

  @Column({ type: 'uuid', array: true, name: 'winner_ids' })
  winnerIds: string[];

  @Column({ type: 'uuid', name: 'big_blind' })
  bigBlind: string;

  @Column({ type: 'uuid', name: 'small_blind' })
  smallBlind: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Game, (game) => game.gameRounds)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @OneToMany(() => UserRound, (userRound) => userRound.gameRounds)
  userRounds: UserRound[];
}
