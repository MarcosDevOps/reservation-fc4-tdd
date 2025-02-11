import { UserEntity } from "../persistence/entities/user_entity";
import { User } from "../../domain/entities/user";
import { DataSource, Repository } from "typeorm";
import { TypeORMUserRepository } from "./typeorm_user_repository";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { PropertyEntity } from "../persistence/entities/property_entity";

describe("TypeORMUserRepository", () => {
  let dataSource: DataSource;
  let userRepository: TypeORMUserRepository;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity, BookingEntity, PropertyEntity],
      synchronize: true,
      logging: false,
    });
    await dataSource.initialize();
    repository = dataSource.getRepository(UserEntity);
    userRepository = new TypeORMUserRepository(repository);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("deve salvar um usuário com sucesso", async () => {
    const user = new User("1", "Marcos da Conceição");
    await userRepository.save(user);

    const savedUser = await repository.findOne({ where: { id: "1" } });
    expect(savedUser).not.toBeNull();
    expect(savedUser?.id).toBe("1");
    expect(savedUser?.name).toBe("Marcos da Conceição");
  });

  it("deve retornar um usuário quando um ID válido for fornecido", async () => {
    const user = new User("1", "Marcos da Conceição");
    await userRepository.save(user);

    const savedUser = await userRepository.findById("1");
    expect(savedUser).not.toBeNull();
    expect(savedUser?.getId()).toBe("1");
    expect(savedUser?.getName()).toBe("Marcos da Conceição");
  });

  it("deve retornar nulo ao buscar um usuário inexistente", async () => {
    const user = await userRepository.findById("999");
    expect(user).toBeNull();
  });
});
