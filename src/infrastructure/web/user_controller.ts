import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { CreateUserDTO } from "../../application/dtos/create_user_dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json({ message: "O campo nome é obrigatório." });
      }

      const dto: CreateUserDTO = {
        name: req.body.name.trim()
      };

      const user = await this.userService.createUser(dto);

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: user.getId(),
          name: user.getName()
        }
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "An unexpected error occurred" });
    }
  }
}