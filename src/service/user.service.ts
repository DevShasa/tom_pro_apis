import { FilterQuery } from "mongoose";
import { omit } from "lodash";

import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input:UserInput){
    try {
        const user:UserDocument = await UserModel.create(input)
        // return user.toJSON()
        return omit(user.toJSON(), "password")
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function validatePassword({email, password}:{email:string; password:string}){
    const user:UserDocument = await UserModel.findOne({email});
    if(!user){
        return false
    }
    
    const isValid = await user.comparePasswords(password)
    if(!isValid){
        return false
    }
    // return the user if password is valid
    return omit(user.toJSON(), "password")
}

export async function findUser(query:FilterQuery<UserDocument>){
    return UserModel.findOne(query).lean();
}