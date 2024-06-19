import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alliance } from './alliance.entity';
import { Club } from './club.entity';

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

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Club, (club) => club.allianceInvitations)
  club: Club;

  @ManyToOne(() => Alliance, (alliance) => alliance.allianceInvitations)
  alliance: Alliance;
}