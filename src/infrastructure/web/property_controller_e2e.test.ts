import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { PropertyService } from "../../application/services/property_service";
import { PropertyController } from "./property_controller";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let propertyRepository: TypeORMPropertyRepository;
let propertyService: PropertyService;
let propertyController: PropertyController;

beforeAll(async () => {
  dataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [PropertyEntity, BookingEntity, UserEntity],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();

  propertyRepository = new TypeORMPropertyRepository(
    dataSource.getRepository(PropertyEntity)
  );

  propertyService = new PropertyService(propertyRepository);
  propertyController = new PropertyController(propertyService);

  app.post("/properties", (req, res, next) => {
    propertyController.createProperty(req, res).catch((err) => next(err));
  });
});

afterAll(async () => {
  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy();
  }
});

describe("PropertyController E2E Tests", () => {
  beforeEach(async () => {
    const propertyRepo = dataSource.getRepository(PropertyEntity);
    await propertyRepo.clear();
  });

  it("deve criar uma propriedade com sucesso", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 5,
        basePricePerNight: 200
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Property created successfully");
    expect(response.body.property).toHaveProperty("id");
    expect(response.body.property.name).toBe("Casa na Praia em Miami");
    expect(response.body.property.description).toBe("Uma linda Casa na Praia em Miami");
    expect(response.body.property.maxGuests).toBe(5);
    expect(response.body.property.basePricePerNight).toBe(200);
  });

  it("deve criar uma propriedade sem descrição", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        maxGuests: 5,
        basePricePerNight: 200
      });

    expect(response.status).toBe(201);
    expect(response.body.property.description).toBe("");
  });

  it("deve retornar erro com código 400 e mensagem 'O nome da propriedade é obrigatório.' ao enviar um nome vazio", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 5,
        basePricePerNight: 200
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O nome da propriedade é obrigatório.");
  });

  it("deve retornar erro 400 ao tentar criar uma propriedade com nome vazio", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "   ",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 5,
        basePricePerNight: 200
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O nome é obrigatório.");
  });

  it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 0,
        basePricePerNight: 200
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A capacidade máxima deve ser maior que zero.");
  });

  it("deve retornar erro 400 ao tentar criar uma propriedade com basePricePerNight menor ou igual a zero", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 5,
        basePricePerNight: 0
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O preço base por noite deve ser maior que zero.");
  });

  it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests negativo", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: -1,
        basePricePerNight: 200
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A capacidade máxima deve ser maior que zero.");
  });

  it("deve retornar erro 400 ao tentar criar uma propriedade com basePricePerNight negativo", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 5,
        basePricePerNight: -100
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O preço base por noite deve ser maior que zero.");
  });

  it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente", async () => {
    const response = await request(app)
      .post("/properties")
      .send({
        name: "Casa na Praia em Miami",
        description: "Uma linda Casa na Praia em Miami",
        maxGuests: 5
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("O preço base por noite é obrigatório.");
  });
});