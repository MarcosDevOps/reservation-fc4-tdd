import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na Grécia";
    propertyEntity.description = "Vista para o Mediterrâneo";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;

    const property = PropertyMapper.toDomain(propertyEntity);

    expect(property).toBeInstanceOf(Property);
    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa na Grécia");
    expect(property.getDescription()).toBe("Vista para o Mediterrâneo");
    expect(property.getMaxGuests()).toBe(6);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.description = "Vista para o Mediterrâneo";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;
    // name is missing

    expect(() => {
      PropertyMapper.toDomain(propertyEntity);
    }).toThrow("O nome é obrigatório");
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property = new Property(
      "1",
      "Casa na Grécia",
      "Vista para o Mediterrâneo",
      6,
      200
    );

    const propertyEntity = PropertyMapper.toPersistence(property);

    expect(propertyEntity).toBeInstanceOf(PropertyEntity);
    expect(propertyEntity.id).toBe("1");
    expect(propertyEntity.name).toBe("Casa na Grécia");
    expect(propertyEntity.description).toBe("Vista para o Mediterrâneo");
    expect(propertyEntity.maxGuests).toBe(6);
    expect(propertyEntity.basePricePerNight).toBe(200);
  });
});