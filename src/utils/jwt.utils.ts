
import jwt from "jsonwebtoken"
import config from 'config'

const privateKey = config.get<string>("privateKey")

export function signJwt(object:Object, options?:jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, options)
}

export function verifyJwt(token: string){
    try {
        const decoded = jwt.verify(token, privateKey)
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    } catch (error:any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}