import { AppDataSource } from '../config/database';
import { Score, GameDifficulty } from '../models/Score';
import { User } from '../models/User';

export class ScoreService {
  private scoreRepository = AppDataSource.getRepository(Score);
  private userRepository = AppDataSource.getRepository(User);

  async create(scoreData: {
    userId: string;
    points: number;
    time: number;
    difficulty: GameDifficulty;
  }): Promise<Score> {
    const user = await this.userRepository.findOneBy({ id: scoreData.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const score = this.scoreRepository.create({
      ...scoreData,
      user,
    });

    return this.scoreRepository.save(score);
  }

  async getLeaderboard(difficulty: GameDifficulty): Promise<Score[]> {
    return this.scoreRepository.find({
      where: { difficulty },
      relations: ['user'],
      order: { points: 'DESC' },
      take: 10,
    });
  }

  async getLeaderboardAll(): Promise<Score[]> {
    return this.scoreRepository.find({
      relations: ['user'],
      order: { points: 'DESC' },
    });
  }
}
