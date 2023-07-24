// database connection 
import mongoose from "mongoose";
import config from 'config'

async function connect(){
    const dbUri = config.get<string>("dbUri")

    // return mongoose.connect(dbUri)
    // .then(()=>{
    //     console.log('👍 Connected to DB')
    // }).catch((error)=>{
    //     console.error("🚩 Could not connect to db::", error)
    //     process.exit(1)
    // })

    try {
        await mongoose.connect(dbUri)
        console.log('👍 Connected to DB')
    } catch (error) {
        console.log("🚩 Could not connect to db::", error)
        process.exit(1)
    }
}

export default connect