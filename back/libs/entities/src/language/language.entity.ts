import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  code: string;

  @Column({ type: 'json' })
  variables: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => User, (user) => user.language, { nullable: true })
  user: User[];
}
