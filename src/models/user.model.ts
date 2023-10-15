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
    comparePasswords(userEnteredPassword:string):Promise<boolean>
}


// schema definition
const UserSchema = new mongoose.Schema({
    email:{type: String, required: true, unique:true},
    name:{type: String, required: true,},
    password:{type: String, required: true,}
},{
    timestamps: true
})

// pre  save hook to hash password
UserSchema.pre("save", async function(next){
    let user = this as UserDocument

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
UserSchema.methods.comparePasswords = async function(userEnteredPassword:string):Promise<boolean>{
    const user = this as UserDocument

    // return true if match, otherwise will throw error
    return bcrypt.compare(userEnteredPassword, user.password).catch(e=> false)
}

// model
const UserModel = mongoose.model("User,", UserSchema)
export default UserModel;

