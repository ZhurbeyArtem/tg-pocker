import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  attribute: string;

  @Column({ type: 'varchar', name: 'file_link' })
  fileLink: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.language, { nullable: true })
  user: User[];
}
