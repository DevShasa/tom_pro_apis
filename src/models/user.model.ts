import mongoose from "mongoose";
import bcrypt from "bcrypt"; // hash user passwprds
import config from "config";

export interface UserDocument extends mongoose.Document{
    email:string,
    name:string,
    password:string
    createdAt:Date
    updatedAt:Date
    comparePassword(userEnteredPassword:string):Promise<Boolean>
}


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        unique: true
    }
},{timestamps:true})

userSchema.pre("save",async (next) => {
    // replace password with hash
    let user = this as unknown as UserDocument

    if(!user.isModified("password")){
        // if the user is not modified false turns to true
        return next()
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
    const hash = await bcrypt.hashSync(user.password, salt)

    //replace user password with hash
    user.password = hash
    return next()

})

userSchema.methods.comparePasswords = async(userEnteredPassword:string):Promise<boolean> =>{
    const user = this as unknown as UserDocument

    return bcrypt.compare(userEnteredPassword, user.password).catch(e=>{
        return false
    })
}

const UserModel = mongoose.model("User", userSchema)
export default UserModel;