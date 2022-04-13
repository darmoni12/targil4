
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flowerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Flower', flowerSchema)
