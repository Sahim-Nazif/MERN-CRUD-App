const mongoose = require('mongoose');

const {ObjectId}= mongoose.Schema;
const postSchema= new mongoose.Schema({

    title:{
        type:String,
        trim:true,
        required: true

    },
    slug:{
        type:String,
        unique:true,
        index:true,
        lowercase:true
    },
    content:{
        type:{},
        required:true

    },
    user:{

        type:String,
        default:'Admin'

    }
},
{timestamps:true}
);

module.exports=mongoose.model('Post', postSchema);