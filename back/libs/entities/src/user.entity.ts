import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './accounts.entity';
import { Language } from './language.entity';
import { Transaction } from './transaction.entity';
import { Tournament } from './tournament.entity';
import { ClubInvitations } from './clubInvitation.entity';
import { ClubBannedAndKickedUsers } from './clubBannedAndKickedUsers.entity';

enum UserRole {
  player = 'player',
  clubAdmin = 'clubAdmin',
  clubUser = 'clubUser',
  admin = 'admin',
  clubModer = 'clubModer',
}

enum UserStatus {
  normal = 'normal',
  kicked = 'kicked',
  banned = 'banned',
  bannedWithMoney = 'bannedWithMoney',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: [UserRole.player],
    array: true,
  })
  role: string[];

  @Column({
    type: 'varchar',
    length: 50,
  })
  nickname: string;

  @Column('int')
  lvl: number; // after user level up his lvl user can connect to more higher club

  @Column('int')
  rank: number; //for more access for functional in club

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.normal,
  })
  status: string;

  @Column({ type: 'varchar', nullable: true, name: 'status_reason' })
  statusReason: string;

  @Column({ type: 'uuid', nullable: true, name: 'banned_by' })
  bannedBy: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', name: 'tg_username' })
  tgUsername: string;

  @Column({ type: 'uuid', name: 'tg_user_id' })
  tgUserId: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ nullable: true, type: 'varchar', name: 'best_hand', array: true })
  bestHand: string[];

  @Column({ type: 'simple-json', name: 'total_games' })
  totalGames: { totalGames: number; totalTournaments: number };

  @Column({ type: 'uuid', array: true })
  friends: string[];

  @Column({ type: 'uuid', name: 'club_id' })
  ClubID: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @ManyToOne(() => Language, (language) => language.user)
  language: Language;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Tournament, (tournament) => tournament.user)
  tournaments: Tournament[];

  @OneToMany(() => ClubInvitations, (clubInvitation) => clubInvitation.user)
  clubInvitations: ClubInvitations[];

  @OneToMany(
    () => ClubBannedAndKickedUsers,
    (clubBannedAndKickedUser) => clubBannedAndKickedUser.user,
  )
  clubBannedAndKickedUsers: ClubBannedAndKickedUsers[];
}
