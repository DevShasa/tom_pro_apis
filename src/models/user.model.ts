import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'


export interface UserInput{
    email: string;
    name: string;
    password: string
}

export interface UserDocument extends UserInput,  mongoose.Document{
    createdAt: Date,
    updatedAt: Date,
    comparePassword(userEnteredPassword:string):Promise<boolean>
}


// schema definition
const userSchema = new mongoose.Schema({
    email:{type: String, required: true, unique:true},
    name:{type: String, required: true,},
    password:{type: String, required: true,}
},{
    timestamps: true
})

// pre  save hook to hash password
userSchema.pre("save", async(next)=>{
    let user = this as unknown as UserDocument

    if(!user?.isModified("password")){
        // user has not been modified
        return next() // fetch the next (save) function
    }

    // else hash the password
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
    const hash = await bcrypt.hashSync(user.password, salt)

    user.password = hash
    return next()
})


// compare password when user logs in
userSchema.methods.comparePasswords = async(userEnteredPassword:string):Promise<boolean>=>{
    const user = this as unknown as UserDocument

    // return true if match, otherwise will throw error
    return bcrypt.compare(userEnteredPassword, user.password).catch(e=>{return false})
}

// model
const UserModel = mongoose.model("User,", userSchema)
export default UserModel;

