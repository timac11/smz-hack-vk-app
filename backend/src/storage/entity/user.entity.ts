import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Competention} from "./competention.entity";

@Entity("users")
export class User {
  @Column()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public lastName: string;

  @Column()
  public photo: string;

  @Column()
  public city: string;

  @Column()
  public rating: number;

  @Column()
  public income: number;

  @Column()
  public inn: string;

  @ManyToMany(type => Competention)
  @JoinTable()
  public comptitions: Competention[];
}
