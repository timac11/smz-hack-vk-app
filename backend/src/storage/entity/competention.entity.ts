import {Column} from "typeorm";

export class Competention {
  @Column()
  public id: string;

  @Column()
  public name: string;
}
