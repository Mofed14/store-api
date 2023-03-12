const Product = require('../models/product')

const getAllProductsStatic = async (req, res)=> {
    const search = 'accent'
    const products = await Product.find({
        name : { $regex: search, $options: 'i' }
    })
    res.status(200).json({products, nubHits: products.length})
}

const getAllProducts = async (req, res)=> {
    // * we set up a new object and first we just pull out the properties
    const { featured, company, name, sort } = req.query
    const queryObject = {}

    // * we'll check if the property is actually coming in with a request.
    if(featured){
       queryObject.featured = featured
    }

    if(company){
       queryObject.company = company
    }

    if(name){
        // $regex: mongodb query operators wil return just the pattern will match 
        // بدل ماكتب الاسم كامل عشان يرجع بالظبط هو هيرجعلي لو حتي جزء من الاسم لو صح
        queryObject.name = {$regex: name, $options: 'i' }
     }
    // console.log(queryObject);
    //  if the property like (featured) is actually coming in with a request. will return the filter data
    // if  the property is not coming in with a request. will return all the data because the queryObject will be empty {} like   Product.find({})
    let result = Product.find(queryObject)
    //  console.log(result)
    if(sort) {
        // query.sort('field -test'); to be like this formate
        const sortList = sort.split(',').join(' ')
       result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({ms:products, nubHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}