import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity("problems")
export class Problem {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public price: string;

  @ManyToOne(type => User)
  public author: User;

  @ManyToOne(type => User)
  public responsible: User;

  @Column({default: "init"})
  public status: string;

  @Column()
  public dueDate: Date;

  @Column({default: false})
  public completed: boolean;


}
