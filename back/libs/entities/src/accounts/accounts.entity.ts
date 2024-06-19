import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Tournament } from '../tournament/tournament.entity';
import { Alliance } from '../alliance/alliance.entity';
import { Club } from '../club/club.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'wallet_address' })
  walletAddress: string;

  @Column('int')
  balance: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.accounts, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Alliance, (alliance) => alliance.accounts, {
    nullable: true,
  })
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;

  @ManyToOne(() => Club, (club) => club.accounts, {
    nullable: true,
  })
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @ManyToOne(() => Tournament, (tournament) => tournament.accounts, {
    nullable: true,
  })
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;
}
