
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const url  = "mongodb+srv://root:toor@cluster0.lvtkr.mongodb.net/myDataBase?retryWrites=true&w=majority"

// mongoose.Promise = global.Promise;

// mongoose.connect(url);

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
