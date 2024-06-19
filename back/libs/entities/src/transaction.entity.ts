import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

enum Type {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
  swap = 'swap',
  joinTable = 'joinTable',
  joinTournament = 'joinTournament',
}

enum Status {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Type,
  })
  type: string;

  @Column({ type: 'timestamp', name: 'send_at' })
  sendAt: Date;

  @Column('float')
  amount: number;

  @Column('varchar')
  address: string;

  @Column('int')
  currency: number;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: string;

  @Column({ type: 'timestamp', name: 'completed_at' })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
