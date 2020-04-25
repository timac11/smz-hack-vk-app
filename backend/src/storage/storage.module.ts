import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './service/user.service';
import {Competention} from "./entity/competention.entity";
import {Problem} from "./entity/problem.entity";
import {ProblemService} from "./service/problem.service";
import * as path from "path";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'SmzHack',
      entities: [`${path.join(__dirname, "..")}/**/*.entity.{ts,js}`],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Competention,
      User,
      Problem
    ])
  ],
  exports: [
    UsersService,
    ProblemService
  ],
  providers: [
    UsersService,
    ProblemService
  ]
})
export class StorageModule {}
