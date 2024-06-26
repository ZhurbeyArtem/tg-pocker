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
import { Tournament } from '../tournament/tournament.entity';
import { Account } from '../accounts/accounts.entity';
import { ClubInvitations } from './clubInvitation.entity';
import { ClubSettings } from './clubSettings.entity';
import { ClubBannedAndKickedUsers } from './clubBannedAndKickedUsers.entity';
import { AllianceInvitations } from '../alliance/allianceInvitation.entity';
import { News } from '../news/news.entity';
import { Alliance } from '../alliance/alliance.entity';

enum clubLocalization {
  ru = 'ru',
  en = 'en',
  ua = 'ua',
  kk = 'kk',
  ka = 'ka',
  de = 'de',
}

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  img: string;

  @Column({
    type: 'enum',
    enum: clubLocalization,
    array: true,
  })
  localization: string;

  @Column('varchar')
  description: string;

  @Column('uuid', { name: 'owner_id' })
  ownerId: string;

  @Column({ type: 'varchar', name: 'chat_link' })
  chatLink: string;

  @Column({ type: 'varchar', name: 'channel_link' })
  channelLink: string;

  @Column('varchar')
  slogan: string;

  @Column({ type: 'simple-json' })
  restrictions: {
    banned: boolean;
    reason: string;
    periodTo: Date;
  };

  @Column('varchar')
  code: string; //code that access to club

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.language, { nullable: true })
  user: User[];

  @OneToMany(() => News, (news) => news.club)
  news: News[];

  @OneToMany(() => Account, (account) => account.club)
  accounts: Account[];

  @OneToMany(() => Tournament, (tournament) => tournament.club)
  tournaments: Tournament[];

  @OneToMany(() => ClubInvitations, (clubInvitation) => clubInvitation.club)
  clubInvitations: ClubInvitations[];

  @OneToMany(
    () => ClubBannedAndKickedUsers,
    (clubBannedAndKickedUser) => clubBannedAndKickedUser.club,
  )
  clubBannedAndKickedUsers: ClubBannedAndKickedUsers[];

  @OneToMany(
    () => AllianceInvitations,
    (allianceInvitation) => allianceInvitation.club,
  )
  allianceInvitations: AllianceInvitations[];

  @ManyToOne(() => Alliance, (alliance) => alliance.clubs, {
    nullable: true,
  })
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;

  @OneToOne(() => ClubSettings)
  @JoinColumn({ name: 'club_settings_id' })
  settings: ClubSettings;
}
