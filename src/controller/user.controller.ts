// handler to create a user
import {Request, Response} from "express"
import { createUser } from "../service/user.service"
import { CreateUserInput } from "../schema/user.schema"

export async function createUserHandler(req:Request<{}, {}, CreateUserInput["body"]>, res:Response){
    try {
        const user = await createUser({email: req.body.email, password: req.body.password, name:req.body.name})// call create user service
        return res.send(user)
    } catch (error: any) {
        console.log("Could not create user ")
        return res.status(409).send(error.message)
    }
}