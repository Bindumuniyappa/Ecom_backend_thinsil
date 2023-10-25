const productSchema = require('../models/product')
const braintree = require('braintree')
const orderSchema = require('../models/order')
const sampleProduct =require('../sample/Product')

const ProductSend = async (req, res) => {
    try {
        let prod =sampleProduct.find()
        return res.status(200).json(prod)
    } catch (error) {
        console.log(`ProductController__ProductSend -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }
}

const UniqueProductSend = async (req, res) => {
    let val = req.params.id
    console.log(val,req.params)
    try {
       const prod = sampleProduct.filter(product => product.name == val)
        // let prod = await productSchema.findOne({ _id: val })
        console.log(prod);
        return res.status(200).json(prod)
    } catch (error) {
        console.log(`ProductController__UniqueProductSend -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }
}

let FindCategory = async (req, res) => {
    let val = req.params.id
    console.log(val,req.params);
    try {
        const prod = sampleProduct.filter(ele => ele.category == val)
        // let prod = await productSchema.find({ category: val })
         console.log("hello",prod );
        return res.status(200).json(prod)
       
    } catch (error) {
        console.log(`ProductController__FindCategory -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }
}

//payment gateway

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).json({ 'message': err })
            } else {
                res.status(200).json(response)
            }
        })
    } catch (error) {
        console.log(`ProductController__braintreeTokenController -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }
}

//payment
const braintreePaymentController = async (req, res) => {
    try {
        const { product, payment, buyers } = req.body
        let order_details = await orderSchema.insertMany({ product, payment, buyers })
        res.status(200).json({ok:true})

    } catch (error) {
        console.log(`ProductController__braintreePaymentController -->  ${error}`)
        return res.status(500).json({ 'message': error })
    }
}


module.exports = {
    ProductSend, UniqueProductSend,
    FindCategory, braintreeTokenController,
    braintreePaymentController
}