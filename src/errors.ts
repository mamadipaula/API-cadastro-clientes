import { NextFunction, Request, Response } from "express"


class AppError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number = 400) {
      super();
      this.message = message;
      this.statusCode = statusCode;
    }
  }

const handleErrors = (err: any, req: Request, res:Response, _:NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    console.error(err)

    return res.status(500).json({
        message: "Internal server error"
    })
}

export { AppError, handleErrors}