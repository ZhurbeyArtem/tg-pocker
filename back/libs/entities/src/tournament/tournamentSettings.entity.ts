import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GameType {
  TEXAS = 'texas',
  OHAMA = 'ohama',
}

@Entity('tournament_settings')
export class TournamentSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'total_players' })
  totalPlayers: number;

  @Column({
    type: 'enum',
    enum: GameType,
    name: 'type_of_game',
  })
  typeOfGame: string;

  @Column({ type: 'int', name: 'buy_in' })
  buyIn: number;

  @Column('float')
  fee: number; // fee from buy in

  @Column({ type: 'simple-json', name: 'prize_distribution' })
  prizeDistribution: {
    firstPlace: number;
    secondPlace: number;
    thirdPlace: number;
  };

  @Column({ type: 'int', name: 'default_user_balance' })
  defaultUserBalance: number;

  @Column({ type: 'int', name: 'small_blind' })
  smallBlind: number;

  @Column({ type: 'int', name: 'big_blind' })
  bigBlind: number;

  @Column('int', { nullable: true })
  ante: number;

  @Column({ type: 'int', name: 'time_decision_in_seconds' })
  timeDecisionInSeconds: number;

  @Column({ type: 'int', name: 'rest_time_in_minutes' })
  restTimeInMinutes: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
