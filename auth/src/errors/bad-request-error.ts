import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    constructor(msg: string){
        super(msg) // will assign to this.message
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    statusCode = 400;
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: `Bad Request Error: ${this.message}`}]
    }
}