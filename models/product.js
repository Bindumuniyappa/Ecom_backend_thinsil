const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    category:{
        type:String,
        required:true
    } ,
    name: {
        type:String,
        required:true
    },
    rating: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    } ,
    price: {
        type:String,
        required:true
    },
    oPrice:{
        type:String,
        required:true
    }
})

const Products=mongoose.model("product",productSchema)
module.exports= Products