import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum gameType {
  private = 'private',
  link = 'link',
  club = 'club',
  public = 'public',
}

@Entity('game_settings')
export class GameSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { name: 'total_users' })
  totalUsers: number;

  @Column('int', { name: 'small_blind' })
  smallBlind: number;

  @Column('int', { name: 'big_blind' })
  bigBlind: number;

  @Column('int')
  ante: number;

  @Column('int', { name: 'min_buy_in' })
  minBuyIn: number;

  @Column('int', { name: 'max_buy_in' })
  maxBuyIn: number;

  @Column('int', { name: 'min_add_on' })
  minAddOn: number;

  @Column('int', { name: 'max_add_on' })
  maxAddOn: number;

  @Column('int')
  stack: number;

  @Column('int', { name: 'max_stack' })
  maxStack: number;

  @Column('int', { name: 'time_decision_in_seconds' })
  timeDecisionInSeconds: number;

  @Column('int', { name: 'rest_time_in_minutes' })
  restTimeInMinutes: number;

  @Column('int', { name: 'fee_percent' })
  feePercent: number;

  @Column('int', { name: 'max_fee' })
  maxFee: number;

  @Column('bool', { name: 'bet_limit' })
  betLimit: boolean;

  @Column('int', { name: 'bet_step' })
  betStep: number;

  @Column('int', { name: 'leave_time_in_minutes' })
  leaveTimeInMinutes: number;

  @Column('enum', { enum: gameType, name: 'access_type' })
  accessType: string;

  @Column('uuid', { nullable: true, name: 'table_id' })
  tableID: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column('bool', { name: 'auto_close' })
  autoClose: boolean;
}
