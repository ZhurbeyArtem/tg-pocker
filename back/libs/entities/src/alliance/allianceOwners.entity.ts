import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alliance } from './alliance.entity';

@Entity('alliance_owners')
export class AllianceOwners {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'moder_username', nullable: true })
  moderUsername: string;

  @Column({ type: 'varchar', name: 'owner_username' })
  ownerUsername: string;

  @Column('uuid', { name: 'club_id' })
  clubId: string;

  @Column('float')
  percent: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Alliance, (alliance) => alliance.allianceOwners, {
    nullable: true,
  })
  @JoinColumn({ name: 'alliance_id' })
  alliance: Alliance;
}
