import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json({ message: "O nome é obrigatório" });
      }

      if (!req.body.maxGuests || req.body.maxGuests <= 0) {
        return res.status(400).json({ message: "O número máximo de hóspedes deve ser maior que zero" });
      }

      if (!req.body.basePricePerNight) {
        return res.status(400).json({ message: "O preço base por noite deve ser maior que zero." });
      }

      if (req.body.basePricePerNight <= 0) {
        return res.status(400).json({ message: "O preço base por noite deve ser maior que zero." });
      }

      const dto: CreatePropertyDTO = {
        name: req.body.name,
        description: req.body.description,
        maxGuests: req.body.maxGuests,
        basePricePerNight: req.body.basePricePerNight
      };

      const property = await this.propertyService.createProperty(dto);

      return res.status(201).json({
        message: "Propriedade criada com sucesso",
        property: {
          id: property.getId(),
          name: property.getName(),
          description: property.getDescription(),
          maxGuests: property.getMaxGuests(),
          basePricePerNight: property.getBasePricePerNight()
        }
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message || "Ocorreu um erro inesperado" });
    }
  }
}