import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserRound } from './userRound.entity';

enum Action {
  BET = 'BET',
  COLL = 'COLL',
  RAISE = 'RAISE',
  BLIND = 'BLIND',
  ANTE = 'ANTE',
  FOLD = 'FOLD',
  CHECK = 'CHECK',
}

@Entity('user_round_actions')
export class UserRoundAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  amount: number;

  @Column({ type: 'enum', enum: Action })
  action: Action;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UserRound, (userRound) => userRound.userRoundActions)
  @JoinColumn({ name: 'user_round_id' })
  userRound: UserRound;
}
