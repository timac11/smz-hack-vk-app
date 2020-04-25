import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from "typeorm";
import {Competention} from "./competention.entity";

@Entity("users")
export class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public lastName: string;

  @Column()
  public photo: string;

  @Column()
  public city: string;

  @Column({default: 0})
  public rating: number;

  @Column({default: 0})
  public income: number;

  @Column({nullable: true})
  public inn: string;

  @ManyToMany(type => Competention)
  @JoinTable()
  public comptitions: Competention[];
}
