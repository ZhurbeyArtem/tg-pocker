import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Tournament } from './tournament.entity';
import { Alliance } from './alliance.entity';
import { Club } from './club.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'wallet_address' })
  walletAddress: string;

  @Column('int')
  balance: number;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.accounts, { nullable: true })
  user: User;

  @ManyToOne(() => Alliance, (alliance) => alliance.accounts, {
    nullable: true,
  })
  alliance: Alliance;

  @ManyToOne(() => Club, (club) => club.accounts, {
    nullable: true,
  })
  club: Club;

  @ManyToOne(() => Tournament, (tournament) => tournament.accounts, {
    nullable: true,
  })
  tournament: Tournament;
}
