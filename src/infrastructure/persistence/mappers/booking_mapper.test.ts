import { BookingMapper } from './booking_mapper';
import { BookingEntity } from '../entities/booking_entity';
import { Booking } from '../../../domain/entities/booking';
import { Property } from '../../../domain/entities/property';
import { User } from '../../../domain/entities/user';
import { DateRange } from '../../../domain/value_objects/date_range';

describe('BookingMapper', () => {
  it('deve converter BookingEntity em Booking corretamente', () => {
    const entity: BookingEntity = {
      id: '1',
      property: {
        id: '1',
        name: 'Casa na praia',
        description: 'Casa na praia com vista para o mar',
        maxGuests: 4,
        basePricePerNight: 100,
        bookings: [],
      } as any,
      guest: { id: '1', name: 'Marcos' } as any,
      startDate: new Date('2025-12-20'),
      endDate: new Date('2025-12-25'),
      guestCount: 2,
      totalPrice: 500,
      status: 'CONFIRMED',
    };

    const domain = BookingMapper.toDomain(entity);

    expect(domain.getId()).toBe(entity.id);
    expect(domain.getProperty().getId()).toBe(entity.property.id);
    expect(domain.getGuest().getId()).toBe(entity.guest.id);
    expect(domain.getDateRange().getStartDate()).toEqual(entity.startDate);
    expect(domain.getDateRange().getEndDate()).toEqual(entity.endDate);
    expect(domain.getGuestCount()).toBe(entity.guestCount);
    expect(domain.getTotalPrice()).toBe(entity.totalPrice);
    expect(domain.getStatus()).toBe(entity.status);
  });

  it('deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity', () => {
    const entity: any = {
      id: '1',
      property: null, // Propriedade obrigatória
      guest: { id: '1', name: 'Marcos' } as any,
      startDate: new Date('2025-12-20'),
      endDate: new Date('2025-12-25'),
      guestCount: 2,
      totalPrice: 500,
      status: 'CONFIRMED',
    };

    expect(() => BookingMapper.toDomain(entity)).toThrow('Propriedade não pode ser nula');
  });

  it('deve converter Booking para BookingEntity corretamente', () => {
    const property = new Property('1', 'Casa na praia', 'Casa na praia com vista para o mar', 4, 100);
    const guest = new User('1', 'Marcos');
    const dateRange = new DateRange(new Date('2025-12-20'), new Date('2025-12-25'));
    const domain = new Booking('1', property, guest, dateRange, 2);

    const entity = BookingMapper.toPersistence(domain);

    expect(entity.id).toBe(domain.getId());
    expect(entity.property.id).toBe(domain.getProperty().getId());
    expect(entity.guest.id).toBe(domain.getGuest().getId());
    expect(entity.startDate).toEqual(domain.getDateRange().getStartDate());
    expect(entity.endDate).toEqual(domain.getDateRange().getEndDate());
    expect(entity.guestCount).toBe(domain.getGuestCount());
    expect(entity.totalPrice).toBe(domain.getTotalPrice());
    expect(entity.status).toBe(domain.getStatus());
  });
});
