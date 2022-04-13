const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        required: true
    },
})

module.exports = mongoose.model('User', userSchema)
