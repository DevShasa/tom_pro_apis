// house database connection 
import mongoose from "mongoose";
import config from "config";

async function connect(){
    const dbUri = config.get<string>("dbUri")

    // return mongoose.connect(dbUri).then(()=>{
    //     console.log("📒: Atlas Mongodb database connected")
    // }).catch((error)=>{
    //     console.error('🙅 Could not connect to mongodb', error);
    //     process.exit(1)
    // })

    try {
        await mongoose.connect(dbUri)
        console.log("📒: Atlas Mongodb database connected")
    } catch (error) {
        console.log('🙅 Could not connect to mongodb');
        console.log(error)
        process.exit(1)
    }
}

export default connect