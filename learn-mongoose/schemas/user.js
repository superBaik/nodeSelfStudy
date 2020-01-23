

const mongoose = require('mongoose');

const {Schema} = mongoose;
const userSchema = new Schema({

        name : {
            type: String, //javascript 객체 String을 바로 가져다가 쓰는것이다. 와우 
            required: true,
            unique: true,
        },
        age:{
            type: Number,
            required: true,
        },
        married:{
            type: Boolean,
            required: true,
        },
        comment:{
            String,

        },
        createAt:{
            type: Date,
            default: Date.now, 
        }
});

module.exports = mongoose.model('User', userSchema);

