import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Club } from './club.entity';
import { Alliance } from './alliance.entity';
import { TournamentSettings } from './tournamentSettings.entity';
import { Account } from './accounts.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'int', name: 'prize_pool' })
  prizePool: number;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'uuid', array: true })
  players: string[];

  @Column({ type: 'timestamp', name: 'date_registration' })
  dateRegistration: Date;

  @Column('varchar')
  logo: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'int', name: 'join_cost' })
  joinCost: number;

  @ManyToOne(() => User, (user) => user.tournaments, { nullable: true })
  user: User;

  @ManyToOne(() => Club, (club) => club.tournaments, { nullable: true })
  club: Club;

  @ManyToOne(() => Alliance, (alliance) => alliance.tournaments, {
    nullable: true,
  })
  alliance: Alliance;

  @OneToMany(() => Account, (account) => account.tournament, { nullable: true })
  accounts: Account[];

  @OneToOne(() => TournamentSettings)
  @JoinColumn()
  settings: TournamentSettings;
}
