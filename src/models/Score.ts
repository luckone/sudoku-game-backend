import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum GameDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
}

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  points!: number;

  @Column()
  time!: number;

  @Column({
    type: 'enum',
    enum: GameDifficulty,
  })
  difficulty!: GameDifficulty;

  @CreateDateColumn()
  date!: Date;

  @ManyToOne(() => User, (user) => user.scores)
  user!: User;
}
