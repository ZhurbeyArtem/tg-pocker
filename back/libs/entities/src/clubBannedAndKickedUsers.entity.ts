import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
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
  
  @Column({ type: 'timestamp', name: 'period_to' })
  periodTo: Date;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.clubBannedAndKickedUsers)
  user: User;

  @ManyToOne(() => Club, (club) => club.clubBannedAndKickedUsers)
  club: Club;
}
