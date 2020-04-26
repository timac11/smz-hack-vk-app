import {Controller, Get, Request, Post, UseGuards, Param} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './storage/service/user.service';
import {ProblemService} from "./storage/service/problem.service";
import {HashConnectService} from "./hash-connect/hash-connect.service";
const { uuid } = require('uuidv4');
const crypto = require('crypto');
const fetch = require('node-fetch');


@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private usersService: UsersService,
              private problemsService: ProblemService,
              private hashConnectService: HashConnectService) {}

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

  @Get("get-suggest-problems/:userId")
  async getSuggestProblems(@Param() params) {
    return this.problemsService.getSuggestionsForUser(params.userId);
  }

  @Get("get-in-progress-problems/:userId")
  async getInProgressProblems(@Param() params) {
    return this.problemsService.getInProgressForUser(params.userId);
  }

  @Get("get-completed-problems/:userId")
  async getCompletedProblems(@Param() params) {
    return this.problemsService.getCompletedForUser(params.userId);
  }

  @Post("suggest-problem")
  async suggestProblems(@Request() req) {
    return this.problemsService.suggestProblemForUser(req.body.problemId, req.body.userId);
  }

  @Post("get-problem-to-work")
  async getProblemToWork(@Request() req) {
    return this.problemsService.getProblemToWork(req.body.problemId, req.body.userId);
  }

  @Get("complete-problem/:problemId")
  async completeProblem(@Param() params) {
    return this.problemsService.completeProblem(params.problemId);
  }

  @Post("create-payment-link")
  async createPaymentLink(@Request() req) {
    const ruid = uuid();
    const pageParams = req.body['pageParams'];
    const price = req.body['price'];
    const sign = crypto.createSign('SHA256');

    const config = {
      username: "startblock",
      password: "4ae72f92-b19c-43f2-bb2f-608723c52614",
      clientId: "smz-api",
      privateKey: "  \n" +
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "MIIEpQIBAAKCAQEA0DTAjn4ofOIFwM8DaBvDW7eTOBDb6docvlFk2y20xOQOUMF8\n" +
        "vcM2IKQeN3DNLiNADw8lP44MYQwgrGRsOBL/njAwC7DhwnjV+FrfH7mIcdwASNjh\n" +
        "bqAX+ng6jC1SN7PFxihGZvknnfgSFpgGdVhR0COYl/SvsFY3XjJ2gnUQcEDO+e2L\n" +
        "TNgO/rwp1eh8ZqHY+J03z/wAzclU7lsomFtyP5UN//RAOf11Ju6DY2tqaJ5Jqw4Q\n" +
        "oSr6EyFA891zzg5/vTRIPZXOXo+JnpGw8oHkb7m9prY5J6fWBWuq/p46RwZ18j3E\n" +
        "G9sbsJeSUVglKGzw4IqdsnQ7f0LonDEXEMlrqQIDAQABAoIBAQCnZtKvfuXkywHf\n" +
        "LVLK4Q+o7aezu3JlytWze9QAmfYvHEIaUgeOt6cMhYg6ATsnbnYx5XaIbBit6sdW\n" +
        "dIPCbhwSPyJSNAzAhNFdFwsxAcaf7UhZSe+vN48v9nz0efgSCzvoADfi0U82Jt+8\n" +
        "RM1kifd1xzkIbFbaC+gGl8JLT/5AkZfHufEqHNB+S6yR/hWO3bBSDktlQ0mzHA0J\n" +
        "XfZD5b14mnsexhWEVRqnNs62933mlPEO88ARSS/Vm4BaMRmP1j93nOK7xnkcV5Pq\n" +
        "6hV0o6DfdHLMH9ok+Rc/7J1rG9Dipbj/3c9+T63Ud6cLiLXcfBurH08WcQRrpXW6\n" +
        "s02Gq7vlAoGBAOswaVifgYcsmEmyeT302jDbDqhvpH2BFujuynskqf/EfDmarqsR\n" +
        "OBTwAhe8O/EGbF89koP1la3QL98m2JBkOpV4/wtxDr/5dJ2cXslf+eF6Kre9ateV\n" +
        "f6mwFOAFoSQgwwD6wih9XTgHopXyuAQdbe2Z7+Q4iVr268UiuR/3StZfAoGBAOKh\n" +
        "HGtxCpeG/Zyq5C5nCXT/UgwgNqMCC4maWf+zBEAzSAjYSrJyt3TwSnasQG4sz/p4\n" +
        "a23w7gUn7c+1HmfNnmsmHlzgElXcpBr2Qw1He/haYwyS+6oSmHA6e5uNQkTonPps\n" +
        "FWz8/sK7/9FBgr507qO02saV0YCwZxsn/8YeNyr3AoGAR8bJj8t2O2vHuk4mpFry\n" +
        "sBBao9sWp1rbRBGEaBqjazRq+SWVAw5JQFKTQO0omgFs15AyA+XSXW54/bCcTUzZ\n" +
        "eD6qD7LcXohiJ6vOXcTVvROMr/C2B79Pa9kaNdhh+mWpPcZJtRO1fGEQJJUjxdW5\n" +
        "c9cUGGGMwd8zy0EyoGfXRh8CgYEAtNIbXNZqvw/j1la7jRKFByaYDji9nz4Iepf+\n" +
        "6veokpjYBsacgtjo65K1tw4kskNrBcuC28t5/f8nzawTQHtcxN07KJtXxc4v2ZtX\n" +
        "UIcSsMtdcDDuP3pqylC/QxNoJpb6eQw35CfQFQvvRsTgTpn5tgCc9gmfiPA2tAIs\n" +
        "H6UIG20CgYEAstycvpQ8H7uIet0MzbLhUgbXpGuoDVXiqumT9SJJLmFncJQMsDRI\n" +
        "hv7/TVSO/ZegYSddhHQ/y2TyTHuSD4S9jU33s1veHun0Y/Pf3VIJv5JEnpFNLkHB\n" +
        "I0GT8XohHo9jMXxuCkNYmbC1VYLkmsTRNnPXaxIr/DVFLmpWyi/bVy4=\n" +
        "-----END RSA PRIVATE KEY-----",
      siteId: "1-1",
      paymentUrl: "https://payment.hashconnect.eu",
      callbackUrl: "http://localhost:65456/callback"
    }
    console.log(pageParams, price);

    function createSignature(method, uri, data) {
      const dataToSign = `${method}\n${uri}\n${data}`;
      sign.write(dataToSign);
      sign.end();

      const signature = sign.sign(config.privateKey, 'base64');

      return signature;
    }

    var body = {
      "action": "purchase",
      "amount" : {
        "amount" : price,
        "currency" : "RUB"
      },
      "externalId" : `${ruid}`,
      "merchantParameters" : {
        "param1" : "1",
        "param2" : "2",
        "param3" : "3"
      },
      "notification" : {
        "url" : "http://localhost:65456/callback",
        "version" : 1
      },
      "pageParameters": pageParams,
      "registerRecurring" : false
    }

    const siteId = config.siteId
    var raw = JSON.stringify(body);

    const uri = `/paymentpageapi/${siteId}/create_payment_link`;

    var myHeaders = {
      "W1-Signature": createSignature('POST', uri, raw),
      "Content-Type": "application/json"
    };

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: myHeaders,
      body: raw,
    };

    const url = `${config.paymentUrl}${uri}`;
    var res = await fetch(url, <any>requestOptions);

    console.log(res.status);

    if (res.ok) {
      res = await res.json();

      console.log(res);

      return res['url'];
    }
  }

  @Get("get-problem/:id")
  async getProblemById(@Param() params) {
    return this.problemsService.findProblemById(params.id);
  }

  @Post("problem/to-be-responsible")
  async toBeResponsible(@Request() req) {
    return this.problemsService.toBeReResponsible(req.body.problemId, req.body.userId);
  }

  // USER /////////////////////////////////////////////
  @Post("authorize")
  async authorize(@Request() req) {
    return await this.usersService.save(req.body.user);
  }

  @Get("get-all-users")
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
