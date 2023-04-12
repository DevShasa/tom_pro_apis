// when a request comes in, provide a schema to validate request
import  { Request, Response, NextFunction } from "express"
import { AnyZodObject } from "zod"

const validate = (schema:AnyZodObject) => (req:Request, res:Response, next:NextFunction) =>{
    // this function returns req, res, next
    try {
        schema.parse({
            body:req.body,
            query: req.query,
            params: req.params
        })
    } catch (error: any) {
        return res.status(400).send(error.errors)
    }
}

export default validate