const mongoose = require('mongoose');
const { param } = require('../routes/admin');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type:String,
        required:true,
        default: 'Nome desconhecido'
    },

    slug: {
        type: String,
        required:true,
    },

    date: {
        type:Date,
        default: Date.now
    }
})

mongoose.model("categories", Category)
