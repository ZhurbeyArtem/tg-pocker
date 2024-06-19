import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from '../club/club.entity';
import { Alliance } from '../alliance/alliance.entity';

enum invitationType {
  club = 'club',
  alliance = 'alliance',
}

@Entity('invitation_links')
export class InvitationLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: invitationType,
  })
  type: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('varchar')
  link: string;

  @Column({ type: 'timestamp', name: 'time_period' })
  timePeriod: Date;

  @ManyToOne(() => Alliance, (alliance) => alliance.invitationLinks)
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;

  @ManyToOne(() => Club, (club) => club.clubInvitations)
  @JoinColumn({ name: 'club_id' })
  club: Club;
}
