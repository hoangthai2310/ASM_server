const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductsSchema = new mongoose.Schema({
    image:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    color:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
})
ProductsSchema.plugin(mongoosePaginate);

const Model = new mongoose.model('products',ProductsSchema);

module.exports = Model;