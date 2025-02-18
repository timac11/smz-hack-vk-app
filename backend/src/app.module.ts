import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import {HashConnectModule} from "./hash-connect/hash-connect.module";

@Module({
  imports: [
    AuthModule,
    StorageModule,
    HashConnectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
