import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
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

  @OneToOne(type => User)
  @JoinColumn()
  public author: User;

  @OneToOne(type => User)
  @JoinColumn()
  public responsible: User;

  @Column()
  public dueDate: Date;

  @Column({default: false})
  public completed: boolean;


}
