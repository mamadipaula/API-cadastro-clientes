import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, type: "varchar" })
  name: string;

  @Column({ length: 100, type: "varchar", unique: true })
  email: string;

  @Column({ length: 12, type: "varchar", unique: true })
  cellphone: string;

  @CreateDateColumn()
  insertedAt: Date;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
