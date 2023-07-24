import express from 'express'
import config from 'config'
import connect from './utils/connect'
import routes from './routes'


const port = config.get<number>('port')

const app = express()
app.use(express.json())
app.listen(port, async()=>{
    console.log(`📚 The app is running on http://localhost:${port}`)
    await connect();

    routes(app)
})