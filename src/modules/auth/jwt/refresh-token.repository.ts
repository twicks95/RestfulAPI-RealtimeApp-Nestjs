import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/modules/abstract.repository";

@Injectable()
export class RefreshTokenRepository extends AbstractRepository {}