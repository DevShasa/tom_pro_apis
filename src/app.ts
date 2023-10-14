import express from 'express'
import config from 'config'
import connect from './utils/connect'
import routes from './routes'
import morgan from 'morgan'

const port = config.get<number>('port')

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.listen(port, async()=>{
    console.log(`📚 The app is running on http://localhost:${port}`)
    await connect();

    routes(app)
})