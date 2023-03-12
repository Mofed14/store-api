// This file to add a static data to database to start setting up our filter functionality.
require('dotenv').config({ path: './env/.env' })
const { EventEmitter } = require('stream')
const connectDB = require('./db/connect')
const Product = require('./models/product')


const jsonProducts = require('./products.json')



const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        // ! I just want to remove all the products that are currently there. then I start from scratch.. This is technically optional.
        await Product.deleteMany({})
        await Product.create(jsonProducts)
        console.log('success!!!!')
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

start()