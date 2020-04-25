import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("competentions")
export class Competention {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;
}
