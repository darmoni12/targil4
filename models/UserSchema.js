const mongoose = require('mongoose')
const Schema = mongoose.Schema


// const url  = "mongodb+srv://root:toor@cluster0.lvtkr.mongodb.net/userSchema?retryWrites=true&w=majority"
// // const url  = "mongodb+srv://root:toor@cluster0.lvtkr.mongodb.net/test"

// mongoose.Promise = global.Promise;

// mongoose.connect(url);

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    image : String,
    active:{
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('User', userSchema)
