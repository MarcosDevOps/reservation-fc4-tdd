import { PropertyMapper } from './property_mapper';
import { PropertyEntity } from '../entities/property_entity';
import { Property } from '../../../domain/entities/property';

describe('PropertyMapper', () => {
  it('deve converter PropertyEntity em Property corretamente', () => {
    const entity: PropertyEntity = {
      id: '1',
      name: 'Casa na praia',
      description: 'Casa na praia com vista para o mar',
      maxGuests: 4,
      basePricePerNight: 100,
      bookings: [],
    };

    const domain = PropertyMapper.toDomain(entity);

    expect(domain.getId()).toBe(entity.id);
    expect(domain.getName()).toBe(entity.name);
    expect(domain.getDescription()).toBe(entity.description);
    expect(domain.getMaxGuests()).toBe(entity.maxGuests);
    expect(domain.getBasePricePerNight()).toBe(entity.basePricePerNight);
  });

  it('deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity', () => {
    const entity: any = {
      id: '1',
      name: '', // Nome obrigatório
      description: 'Casa na praia com vista para o mar',
      maxGuests: 4,
      basePricePerNight: 100,
      bookings: [],
    };

    expect(() => PropertyMapper.toDomain(entity)).toThrow('O nome é obrigatório');
  });

  it('deve converter Property para PropertyEntity corretamente', () => {
    const domain = new Property('1', 'Casa na Praia', 'Casa na praia com vista para o mar', 4, 100);

    const entity = PropertyMapper.toPersistence(domain);

    expect(entity.id).toBe(domain.getId());
    expect(entity.name).toBe(domain.getName());
    expect(entity.description).toBe(domain.getDescription());
    expect(entity.maxGuests).toBe(domain.getMaxGuests());
    expect(entity.basePricePerNight).toBe(domain.getBasePricePerNight());
  });
});
