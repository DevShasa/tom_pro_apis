import SessionModel, {SessionDocument} from "../models/session.model"


export async function createSession(userId:string, userAgent:string): Promise<SessionDocument>{
    const session = await SessionModel.create({
        user: userId,
        userDeviceAgent: userAgent
    })

    return session.toJSON() // convert to json
}