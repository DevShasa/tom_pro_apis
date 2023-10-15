import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { UserDocument } from './user.model'
import { string } from 'zod'


export interface IsessionSchema{
    user: UserDocument['_id']
    valid: Boolean
    userDeviceAgent: string
}

export interface SessionDocument extends IsessionSchema,  mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
}


// schema definition
const sessionSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    valid: {type:Boolean, default: true},
    userDeviceAgent :{type: String}
},{
    timestamps: true
})



// model
const SessionModel = mongoose.model("Session", sessionSchema)
export default SessionModel;

