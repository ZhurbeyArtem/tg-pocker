import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Club } from './club.entity';


@Entity('clubs_attempts_login')
export class ClubAttemptsLogin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 1 })
  tries: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.clubAttemptsLogin)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Club, (club) => club.clubAttemptsLogin)
  @JoinColumn({ name: 'club_id' })
  club: Club;
}