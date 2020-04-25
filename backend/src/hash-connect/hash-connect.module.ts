import {Module} from "@nestjs/common";
import {HashConnectService} from "./hash-connect.service";

@Module({
  exports: [HashConnectService],
  providers: [HashConnectService]
})
export class HashConnectModule {
  
}
