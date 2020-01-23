

const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types:{ObjectId} }  = Schema; //있어야되는 이유 ? 

const commentSchema = new Schema({

    commenter :{  //여기서는 사용자의 id가 필요하다. 
        type: ObjectId, //이건 몽고에서 자동으로 생성하는 아이디이다. 
        required: true,
        ref: 'User', // 언제 추가된건지 .. .? populate --> ref : 'User' 이걸보고 ~ 
         
    },
    comment:{
        type: String,
        required: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    }



});
//작성자 
module.exports = mongoose.model('Comment', commentSchema)
