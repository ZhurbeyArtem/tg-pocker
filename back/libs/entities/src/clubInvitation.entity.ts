import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
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

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.clubInvitations)
  user: User;

  @ManyToOne(() => Club, (club) => club.clubInvitations)
  club: Club;
}
