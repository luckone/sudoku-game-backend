import { Request, Response } from 'express';
import { ScoreService } from '../services/score.service';
import { GameDifficulty } from '../models/Score';

export interface LeaderboardEntry {
  player: string;
  points: number;
  time: number;
  difficulty: GameDifficulty;
  date: Date;
}

export class ScoreController {
  private scoreService = new ScoreService();

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, points, time, difficulty } = req.body;
      const score = await this.scoreService.create({
        userId,
        points,
        time,
        difficulty: difficulty as GameDifficulty,
      });
      res.status(201).json(score);
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public getLeaderboard = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const scores = await this.scoreService.getLeaderboardAll();

      const leaderboard: {
        [key in GameDifficulty]: LeaderboardEntry[];
      } = {
        [GameDifficulty.BEGINNER]: [],
        [GameDifficulty.INTERMEDIATE]: [],
        [GameDifficulty.HARD]: [],
        [GameDifficulty.EXPERT]: [],
      };

      scores.forEach((score) => {
        const entry: LeaderboardEntry = {
          player: score.user.name,
          points: score.points,
          time: score.time,
          difficulty: score.difficulty,
          date: score.date,
        };

        leaderboard[score.difficulty].push(entry);
      });

      res.json({ leaderboard });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  };
}
