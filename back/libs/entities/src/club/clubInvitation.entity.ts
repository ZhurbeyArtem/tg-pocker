import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Club } from './club.entity';

enum clubInvitationsStatus {
  apply = 'apply',
  reject = 'reject',
  waiting = 'waiting',
}

@Entity('clubs_invitation')
export class ClubInvitations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: clubInvitationsStatus,
    default: clubInvitationsStatus.waiting,
  })
  status: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.clubInvitations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Club, (club) => club.clubInvitations)
  @JoinColumn({ name: 'club_id' })
  club: Club;
}
