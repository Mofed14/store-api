const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product Name Must Be Provided']
    },
    price: {
        type: Number,
        required: [true, 'Product Price Must Be Provided']
    },
    company : {
        type: String, 
        enum : {
            values: ['ikea','liddy', 'caressa', 'marcos'],
            message : '{VALUE} is not supported'

        }
    },
    featured: {type: Boolean, default: false},
    createdAt : { type: Date,  default: Date.now()},
    rating: {type: Number, default: 4.5}
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;