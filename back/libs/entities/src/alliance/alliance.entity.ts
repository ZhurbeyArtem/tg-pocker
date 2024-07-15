import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tournament } from '../tournament/tournament.entity';
import { AllianceInvitations } from './allianceInvitation.entity';
import { News } from '../news/news.entity';
import { Account } from '../accounts/accounts.entity';
import { AllianceOwners } from './allianceOwners.entity';
import { Club } from '../club/club.entity';

enum allianceLocalization {
  ru = 'ru',
  en = 'en',
  ua = 'ua',
  kk = 'kk',
  ka = 'ka',
  de = 'de',
}

enum allianceType {
  opened = 'opened',
  closed = 'closed',
}

@Entity('alliance')
export class Alliance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  motto: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  avatar: string;

  @Column({ type: 'varchar', name: 'chat_link' })
  chatLink: string;

  @Column({ type: 'varchar', name: 'channel_link' })
  channelLink: string;

  @Column('varchar')
  description: string;

  @Column({ type: 'int', name: 'coin_ration' })
  coinRation: number;

  @Column({
    type: 'enum',
    enum: allianceLocalization,
  })
  localization: string;

  @Column({
    type: 'enum',
    enum: allianceType,
  })
  type: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => News, (news) => news.alliance)
  news: News[];

  @OneToMany(() => Account, (account) => account.alliance)
  accounts: Account[];

  @OneToMany(() => Tournament, (tournament) => tournament.alliance)
  tournaments: Tournament[];

  @OneToMany(() => Club, (club) => club.alliance)
  clubs: Club[];

  // @OneToMany(() => InvitationLink, (invitationLink) => invitationLink.alliance)
  // invitationLinks: InvitationLink[];

  @OneToMany(() => AllianceOwners, (allianceOwners) => allianceOwners.alliance)
  allianceOwners: AllianceOwners[];

  @OneToMany(
    () => AllianceInvitations,
    (allianceInvitation) => allianceInvitation.alliance,
  )
  allianceInvitations: AllianceInvitations[];
}
