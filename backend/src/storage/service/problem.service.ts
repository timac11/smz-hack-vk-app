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

  public async toBeReResponsible(problemId: string, userId: string): Promise<Problem> {
    const user = await this.userRepository.findOne({id: userId});
    const problem = await this.findProblemById(problemId);
    problem.responsible = user;
    return  await this.problemRepository.save(problem);
  }

  public async findProblemById(id: string): Promise<Problem> {
    return await this.problemRepository.findOne({id}, {relations: ["author", "responsible", "suggest"]});
  }

  public async getAllProblems(): Promise<Problem[]> {
    return this.problemRepository.find({relations: ["author", "responsible", "suggest"]});
  }

  public async getSuggestionsForUser(userId: string): Promise<Problem[]> {
    const user = await this.userRepository.findOne({id: userId});
    return await this.problemRepository.find({
      where: {
        suggest: user,
        status: "suggest"
      },
      relations: ["suggest", "author", "responsible"]
    })
  }

  public async getInProgressForUser(userId: string): Promise<Problem[]> {
    const user = await this.userRepository.findOne({id: userId});
    return await this.problemRepository.find({
      where: {
        user,
        status: "inProgress"
      }
    })
  }

  public async suggestProblemForUser(problemId: string, userId: string): Promise<Problem> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    const problem = await this.findProblemById(problemId);
    problem.suggest = user;
    problem.status = "suggest";
    await this.problemRepository.save(problem);
    return await this.findProblemById(problemId);
  }

  public async getProblemToWork(problemId: string, userId: string): Promise<Problem> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    const problem = await this.findProblemById(problemId);
    problem.suggest = null;
    problem.responsible = user;
    problem.status = "inProgress";
    await this.problemRepository.save(problem);
    return await this.findProblemById(problemId);
  }

  public async completeProblem(problemId: string): Promise<Problem> {
    const problem = await this.findProblemById(problemId);
    problem.status = "completed";
    await this.problemRepository.save(problem);
    return await this.findProblemById(problemId);
  }

  public async getCompletedForUser(userId: string): Promise<Problem[]> {
    const user = await this.userRepository.findOne({id: userId});
    return await this.problemRepository.find({
      where: {
        user,
        status: "completed"
      }
    })
  }
}
