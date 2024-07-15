import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Club } from './club.entity';

enum clubType {
  kick = 'kick',
  ban = 'ban',
}

@Entity('club_banned_and_kicked_users')
export class ClubBannedAndKickedUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  reason: string;

  @Column({ type: 'enum', enum: clubType })
  type: string;

  @Column({ type: 'uuid' })
  bannedBy: string;

  @Column({ type: 'date', name: 'period_to' })
  periodTo: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.clubBannedAndKickedUsers)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @ManyToOne(() => Club, (club) => club.clubBannedAndKickedUsers)
  @JoinColumn({ name: 'club_id' })
  club: string;
}
