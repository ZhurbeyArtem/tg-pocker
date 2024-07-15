import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from '../club/club.entity';

enum clubRole {
  clubAdmin = 'clubAdmin',
  clubMember = 'clubMember',
  clubModer = 'clubModer',
}

enum Status {
  active = 'active',
  expired = 'expired',
}

@Entity('club_invitation_links')
export class ClubInvitationLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'created_by',
  })
  createdBy: string;

  @Column({
    type: 'enum',
    enum: clubRole,
    default: clubRole.clubMember
  })
  role: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.active
  })
  status: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('varchar')
  code: string;

  @Column('int', { name: 'total_invited', default: 0 })
  totalInvited: string;

  @Column({ type: 'date', name: 'time_period' })
  timePeriod: string;

  @ManyToOne(() => Club, (club) => club.clubInvitationLinks)
  @JoinColumn({ name: 'club_id' })
  club: string;
}
