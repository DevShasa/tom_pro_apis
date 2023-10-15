import { createSession } from "../service/session.service";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { Session } from "inspector";
export async function createUserSessionHandler(req:Request, res:Response){
    /**
     * To create a session
     * 1. validate users password
     * 2. create a session
     * 3. Create an access and refresh token
     * 5. Return access and refresh tokens
     */

    // validate users passwors
    const user = await validatePassword(req.body)
    if(!user){
        return res.status(401).send("Invalid email or password")
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "")

    // create an access token
    const accessToken = signJwt(
        {...user,session: session._id},
        {expiresIn: config.get<string>("accessTokenTimeToLive")} // 15 minutes
    )

    // create a refresh token 
    const refreshToken = signJwt(
        {...user,session: session._id},
        {expiresIn: config.get<string>("refreshTokenTimeToLive")} // 15 minutes
    )

    return res.send({accessToken, refreshToken})

}