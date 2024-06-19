import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { GameRounds } from '../game/gameRounds.entity';
import { User } from './user.entity';
import { UserRoundAction } from './userRoundAction.entity';

@Entity('user_rounds')
export class UserRound {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  balance: number;

  @Column('varchar', { array: true })
  cards: string[];

  @Column('varchar')
  combination: string;

  @Column('int', { name: 'place_number' })
  placeNumber: number;

  @Column('int', { name: 'round_number' })
  roundStage: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => GameRounds, (gameRounds) => gameRounds.userRounds)
  @JoinColumn({ name: 'game_rounds_id' })
  gameRounds: GameRounds;

  @ManyToOne(() => User, (user) => user.userRounds)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => UserRoundAction,
    (userRoundAction) => userRoundAction.userRound,
  )
  userRoundActions: UserRoundAction[];
}
