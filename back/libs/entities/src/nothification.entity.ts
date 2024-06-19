import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Type {
  neutral = 'neutral',
  error = 'error',
  progress = 'progress',
  success = 'success',
  news = 'news',
  invite = 'invite',
}

enum Status {
  err = 'err',
  success = 'success',
  inProgress = 'inProgress',
}
@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  message: string;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: string;

  @Column({ type: 'uuid', nullable: true, array: true, name: 'club_ids' })
  clubIds: string;

  @Column({ type: 'uuid', nullable: true, array: true, name: 'alliance_ids' })
  allianceIds: string;

  @Column({ type: 'uuid', nullable: true, array: true, name: 'user_ids' })
  userIds: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: string;
}
