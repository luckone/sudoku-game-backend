import { AppDataSource } from '../config/database';
import { User } from '../models/User';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(name: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { name } });
    if (existingUser) {
      throw new Error('User with this name already exists');
    }

    const user = this.userRepository.create({ name });
    return this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['scores'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
