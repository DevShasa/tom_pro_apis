import express from "express";
import config from "config";
import connect from "./utils/connect";
import routes from "./routes/routes";

const port = config.get<number>("port")

const app = express()

app.listen(port, async()=>{
    console.log(`📗:App is running at http://localhost:${port}`)
    await connect();

    routes(app)
})