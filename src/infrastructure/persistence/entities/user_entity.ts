import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { BookingEntity } from "./booking_entity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => BookingEntity, (booking) => booking.guest)
  bookings!: BookingEntity[];
}
