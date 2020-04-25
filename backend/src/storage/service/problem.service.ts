import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Problem} from "../entity/problem.entity";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,
              @InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  public async saveByUserId(userId: string, problem: Problem) {
    const user: User = await this.userRepository.findOne({id: userId});
    console.log(user);
    await this.problemRepository.save({
      ...problem, author: user
    });
  }

  public async findProblemsByAuthorId(userId: string): Promise<Problem[]> {
    const user: User = await this.userRepository.findOne({id: userId});
    return await this.problemRepository.find({
      where: {
        author: user
      },
      relations: ["author", "responsible"]
    })
  }

  public async findProblemsByResponsibleId(userId: string): Promise<Problem[]> {
    const user: User = await this.userRepository.findOne({id: userId});
    return await this.problemRepository.find({
      where: {
        responsible: user
      },
      relations: ["author", "responsible"]
    })
  }

  public async getAllProblems(): Promise<Problem[]> {
    return this.problemRepository.find({relations: ["author", "responsible"]});
  }
}
