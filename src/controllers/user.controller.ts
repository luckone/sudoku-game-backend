import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.findOne(req.params.id);
      res.json(user);
    } catch (error: unknown) {
      res.status(404).json({ message: (error as Error).message });
    }
  };
}
