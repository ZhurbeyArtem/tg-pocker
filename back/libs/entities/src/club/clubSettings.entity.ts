import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum clubType {
  opened = 'opened',
  closed = 'closed',
}

enum clubRole {
  clubAdmin = 'clubAdmin',
  clubMember = 'clubMember',
  clubModer = 'clubModer',
}

@Entity('club_settings')
export class ClubSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: clubType,
  })
  type: string;

  @Column({ type: 'varchar', name: 'work_hours' })
  workHours: string;

  @Column({
    type: 'enum',
    enum: clubRole,
    name: 'default_role',
    default: clubRole.clubMember,
  })
  defaultRole: string;

  @Column({ type: 'float', name: 'coin_ration' })
  coinRation: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
