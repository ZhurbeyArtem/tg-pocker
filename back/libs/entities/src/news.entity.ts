import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alliance } from './alliance.entity';
import { Club } from './club.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column('varchar')
  link: string;

  @Column('varchar')
  description: string;

  @ManyToOne(() => Club, (club) => club.news)
  club: Club;

  @ManyToOne(() => Alliance, (alliance) => alliance.news)
  alliance: Alliance;
}