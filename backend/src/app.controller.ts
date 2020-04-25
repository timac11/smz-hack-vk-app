import {Controller, Get, Request, Post, UseGuards, Param} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './storage/service/user.service';
import {ProblemService} from "./storage/service/problem.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private usersService: UsersService,
              private problemsService: ProblemService) {}

  //TODO add validation for user fields
  @Post("register")
  async register(@Request() req) {
    await this.usersService.save(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // PROBLEM ////////////////////////////////////////
  @Post("create-problem")
  async createProblem(@Request() req) {
    return await this.problemsService.saveByUserId(req.body.userId, req.body.problem)
  }

  @Get("get-all-problems")
  async getAllProblems() {
    return this.problemsService.getAllProblems();
  }

  @Get("get-author-problems/:userId")
  async getAuthorProblems(@Param() params) {
    return this.problemsService.findProblemsByAuthorId(params.userId);
  }

  @Get("get-responsible-problems/:userId")
  async getResponsibleProblems(@Param() params) {
    return this.problemsService.findProblemsByResponsibleId(params.userId);
  }

  @Get("get-problem/:id")
  async getProblemById(@Param() params) {
    return this.problemsService.findProblemById(params.id);
  }

  // USER /////////////////////////////////////////////
  @Post("authorize")
  async authorize(@Request() req) {
    return await this.usersService.save(req.body.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
