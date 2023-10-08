import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class HttpHelper {
    generateResponse(code: number, result: any | null, res: Response) {
        return res.json({
            statusCode: code,
            data: result
        })
    }
}