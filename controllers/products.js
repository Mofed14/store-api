const Product = require('../models/product')

const getAllProductsStatic = async (req, res)=> {
    const products = await Product.find({
        price: { $gte: 30 } 
    })
    .sort('name')
    .select('name price')
    res.status(200).json({products, nubHits: products.length})
}

const getAllProducts = async (req, res)=> {
    // * we set up a new object and first we just pull out the properties
    const { featured, company, name, sort, fields, numericFilters } = req.query
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
  
     if(numericFilters){
        const operatorMap = {
            ">" : '$gt',
            ">=" : '$gte',
            "=" : '$eq',
            "<" : '$lt',
            "<=" : '$le'
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=> `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(item => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
     }
     console.log(queryObject)

    //  if the property like (featured) is actually coming in with a request. will return the filter data
    // if  the property is not coming in with a request. will return all the data because the queryObject will be empty {} like   Product.find({})
    let result = Product.find(queryObject)
  
    // sort  
    if(sort) {
        // query.sort('field -test'); to be like this formate
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    // select 
    if(fields) {
        // query.sort('field -test'); to be like this formate
        const selectList = fields.split(',').join(' ')
        result = result.select(selectList)
    } 

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ms:products, nubHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}