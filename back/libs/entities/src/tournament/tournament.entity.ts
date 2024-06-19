import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Club } from '../club/club.entity';
import { Alliance } from '../alliance/alliance.entity';
import { TournamentSettings } from './tournamentSettings.entity';
import { Account } from '../accounts/accounts.entity';

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

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'int', name: 'join_cost' })
  joinCost: number;

  @ManyToOne(() => User, (user) => user.tournaments, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Club, (club) => club.tournaments, { nullable: true })
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @ManyToOne(() => Alliance, (alliance) => alliance.tournaments, {
    nullable: true,
  })
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;

  @OneToMany(() => Account, (account) => account.tournament, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  accounts: Account[];

  @OneToOne(() => TournamentSettings)
  @JoinColumn({ name: 'tournament_settings_id' })
  settings: TournamentSettings;
}
