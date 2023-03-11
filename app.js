const express = require('express')
const routes = require('./routes/products')
const connectedDb = require('./db/connect')
require('dotenv').config({ path: './env/.env' })
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const port = process.env.PORT || 6000;
const app = express()

// Middleware
app.use(express.json())

// products roots
app.get('/', (req,res)=> {
    res.send(`
        <h1>Store Api</h1>
        <a href="/api/v1/products">Products Route</a>
    `)
})

// Routes 
app.use('/api/v1/products/', routes)
app.use(notFound)
app.use(errorHandler)
  
const start = async ()=> {
    try {
        await connectedDb(process.env.MONGO_URL)
        app.listen(port, console.log(`Server Is Listening On Port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()