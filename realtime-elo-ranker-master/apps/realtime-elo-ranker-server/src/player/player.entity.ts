import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Match } from '../match/match.entity';

@Entity()
export class Player {
  // je veux que ce sois moi qui donne l'id
  @PrimaryColumn()
  id: string;

  @Column({ default: 1000 })
  elo: number;

  @Column({ default: 1000 })
  rank: number;

  @OneToMany(() => Match, (match) => match.winner)
  wins: Match[];

  @OneToMany(() => Match, (match) => match.loser)
  losses: Match[];
}