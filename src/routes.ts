// takes in a http request and forwarding it to a controller
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controler";
import { createSessionSchema } from "./schema/session.schema";

function routes(app:Express){
    app.get(`/healthcheck`, (req:Request, res:Response)=>{
        return res.sendStatus(200)
    })


    app.post('/api/users',validate(createUserSchema), createUserHandler)

    app.post('/api/sessions',validate(createSessionSchema), createUserSessionHandler)

}

export default routes