import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json({ message: "O campo nome é obrigatório." });
      }

      const user = await this.userService.createUser({ name: req.body.name });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          id: user.getId(),
          name: user.getName(),
        },
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}