import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PostgresProvider } from "src/database/postgres/postgres.provider";
import { HttpHelper } from "src/helper/http.helper";

@Module({
    imports: [],
    providers: [PostgresProvider, HttpHelper, UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }