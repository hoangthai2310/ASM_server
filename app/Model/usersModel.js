const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    image:{
        type:String,
        required: true
    },
    fullname:{
        type:String,
        required: true
    },
    sex:{
        type: String,
        required: true 
    },
    birthDate:{
        type: Date,
        require:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    admin:String
})
UserSchema.plugin(mongoosePaginate);

const Model = new mongoose.model('users',UserSchema);

module.exports = Model;