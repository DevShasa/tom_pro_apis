import  { Request, Response, NextFunction } from "express"

export function createUserHandler(req:Request, res:Response, next:NextFunction){
    try {
        // const user = await // call create user service
    } catch (error) {
        console.log(error)
        return res.status(409)
    }
}