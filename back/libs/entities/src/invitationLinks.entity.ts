import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from './club.entity';
import { Alliance } from './alliance.entity';

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

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column('varchar')
  link: string;

  @Column({ type: 'timestamp', name: 'time_period' })
  timePeriod: Date;

  @ManyToOne(() => Alliance, (alliance) => alliance.invitationLinks)
  alliance: Alliance;

  @ManyToOne(() => Club, (club) => club.clubInvitations)
  club: Club;
}
