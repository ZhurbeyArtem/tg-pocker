import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alliance } from '../alliance/alliance.entity';
import { Club } from '../club/club.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('varchar')
  link: string;

  @Column('varchar')
  description: string;

  @ManyToOne(() => Club, (club) => club.news)
  @JoinColumn({ name: 'club_id' })
  club: Club;

  @ManyToOne(() => Alliance, (alliance) => alliance.news)
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;
}
