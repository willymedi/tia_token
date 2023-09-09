import express from 'express'
import tokenRouter from './routes/tokens-routes'
import userRoutes from './routes/user-routes'


const cors = require('cors'); 
const app  = express()
app.use(cors());
app.use(express.json())

const PORT = 3000


app.get('/ping', (_req, res) => {
    console.log('Someone pinged here !!')
    res.send('pong')
})

app.use('/token', tokenRouter)
app.use('/user', userRoutes)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    
})