


const getAllProductsStatic = async (req, res)=> {
    res.status(200).json({ms:'Products testing route'})
}

const getAllProducts = async (req, res)=> {
    res.status(200).json({ms:'Products route'})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}