import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
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

  @Post("create-problem")
  async createProblem(@Request() req) {

  }

  @Post("authorize")
  async authorize(@Request() req) {
    return await this.usersService.save(req.body.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
