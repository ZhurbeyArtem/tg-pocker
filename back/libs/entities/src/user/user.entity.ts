import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../accounts//accounts.entity';
import { Language } from '../language//language.entity';
import { Transaction } from '../transaction//transaction.entity';
import { Tournament } from '../tournament/tournament.entity';
import { ClubInvitations } from '../club/clubInvitation.entity';
import { ClubBannedAndKickedUsers } from '../club/clubBannedAndKickedUsers.entity';
import { UserRound } from './userRound.entity';
import { RefreshToken } from './userRefreshToken.entity';

enum UserRole {
  player = 'player',
  clubAdmin = 'clubAdmin',
  clubUser = 'clubUser',
  admin = 'admin',
  clubModer = 'clubModer',
  allianceAdmin = 'allianceAdmin',
  allianceModer = 'allianceModer',
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
  roles: string[];

  @Column({
    type: 'varchar',
    length: 50,
  })
  nickname: string;

  @Column('int', { default: 1 })
  lvl: number; // after user level up his lvl user can connect to more higher club

  @Column('int', { default: 1 })
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

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'varchar', name: 'tg_username' })
  tgUsername: string;

  @Column({ type: 'uuid', name: 'tg_user_id' })
  tgUserId: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  accessToken: string;

  @Column({ nullable: true, type: 'varchar', name: 'best_hand', array: true })
  bestHand: string[];

  @Column({ type: 'simple-json', name: 'total_games', default: { totalGames: 0, totalTournaments: 0 } })
  totalGames: { totalGames: number; totalTournaments: number };

  @Column({ type: 'uuid', array: true, default: [] })
  friends: string[];

  @Column({ type: 'uuid', name: 'club_id', nullable: true })
  ClubID: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @ManyToOne(() => Language, (language) => language.user)
  @JoinColumn({ name: 'language_id' })
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

  @OneToMany(() => UserRound, (userRound) => userRound.user)
  userRounds: UserRound[];

  @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
  refreshTokens: RefreshToken[];
}
