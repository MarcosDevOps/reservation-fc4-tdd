import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { Booking } from "../../../domain/entities/booking";

describe("BookingMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa na Grécia";
    propertyEntity.description = "Vista para o Mediterrâneo";
    propertyEntity.maxGuests = 6;
    propertyEntity.basePricePerNight = 200;

    const userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "Marcos da Conceição";

    const bookingEntity = new BookingEntity();
    bookingEntity.id = "1";
    bookingEntity.property = propertyEntity;
    bookingEntity.guest = userEntity;
    bookingEntity.startDate = new Date("2025-02-10");
    bookingEntity.endDate = new Date("2025-02-15");
    bookingEntity.guestCount = 4;
    bookingEntity.totalPrice = 1000;
    bookingEntity.status = "CONFIRMED";

    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("1");
    expect(booking.getProperty().getId()).toBe("1");
    expect(booking.getGuest().getId()).toBe("1");
    expect(booking.getDateRange().getStartDate()).toEqual(new Date("2025-02-10"));
    expect(booking.getDateRange().getEndDate()).toEqual(new Date("2025-02-15"));
    expect(booking.getGuestCount()).toBe(4);
    expect(booking.getTotalPrice()).toBe(1000);
    expect(booking.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const bookingEntity = new BookingEntity();
    bookingEntity.id = "1";
    // property is missing
    bookingEntity.guest = new UserEntity();
    bookingEntity.startDate = new Date("2025-02-10");
    bookingEntity.endDate = new Date("2025-02-15");
    bookingEntity.guestCount = 4;
    bookingEntity.totalPrice = 1000;
    bookingEntity.status = "CONFIRMED";

    expect(() => {
      BookingMapper.toDomain(bookingEntity);
    }).toThrow();
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property(
      "1",
      "Casa na Grécia",
      "Vista para o Mediterrâneo",
      6,
      200
    );
    const user = new User("1", "Marcos da Conceição");
    const dateRange = new DateRange(
      new Date("2025-02-10"),
      new Date("2025-02-15")
    );
    const booking = new Booking("1", property, user, dateRange, 4);

    const bookingEntity = BookingMapper.toPersistence(booking);

    expect(bookingEntity).toBeInstanceOf(BookingEntity);
    expect(bookingEntity.id).toBe("1");
    expect(bookingEntity.property.id).toBe("1");
    expect(bookingEntity.guest.id).toBe("1");
    expect(bookingEntity.startDate).toEqual(new Date("2025-02-10"));
    expect(bookingEntity.endDate).toEqual(new Date("2025-02-15"));
    expect(bookingEntity.guestCount).toBe(4);
    expect(bookingEntity.status).toBe("CONFIRMED");
  });
});