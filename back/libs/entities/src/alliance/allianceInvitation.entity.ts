import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alliance } from './alliance.entity';
import { Club } from '../club/club.entity';

enum allianceInvitationsStatus {
  apply = 'apply',
  reject = 'reject',
  waiting = 'waiting',
}

@Entity('alliances_invitation')
export class AllianceInvitations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: allianceInvitationsStatus,
    default: allianceInvitationsStatus.waiting,
  })
  status: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Club, (club) => club.allianceInvitations)
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @ManyToOne(() => Alliance, (alliance) => alliance.allianceInvitations)
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;
}
