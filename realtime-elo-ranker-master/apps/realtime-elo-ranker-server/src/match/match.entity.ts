// match.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Player } from '../player/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number; 

  @ManyToOne(() => Player, { nullable: true })
  winner: Player | null;

  @ManyToOne(() => Player, { nullable: true })
  loser: Player | null;

  @Column({ default: false })
  draw: boolean;

  @Column()
  date: Date;
}
