
const express = require('express');

var Comment = require('../schemas/comment'); //Step1 . 쿼리하려면 일단 스키마부터 불러와야겠지? 

const router = express.Router();

router.get('/:id', function (req, res, next) {
    Comment.find({ commenter: req.params.id }).populate('commenter')//populate(필드)가 시퀄라이즈include와 비슷한 역할을 함 //join과같은기능 //,mongodb가 아니라mongoose가 억지로 해주는것이다. 성능이 더 떨어진다는것
      .then((comments) => {
        console.log(comments);
        res.json(comments);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  });
//revise
router.patch('/:id', (req,res,next) =>{
    Comment.update({ _id: req.params.id }, { comment: req.body.comment })  // 앞뒤 괄호{}가 시퀄이랑 반대. 고치고싶은 아이디가 첫째, 둘째괄호는 수정할 값 .
        .then((result)=>{
            res.json(result)
        })
        .catch((error)=>{
            console.error(error);
            next(error)
        })

})

router.delete('/:id', (req,res,next) =>{
    Comment.remove({ _id: req.params.id })  // 앞뒤 괄호{}가 시퀄이랑 반대. 고치고싶은 아이디가 첫째, 둘째괄호는 수정할 값 .
        .then((result)=>{
            res.json(result)
        })
        .catch((error)=>{
            console.error(error);
            next(error)
        })
})

router.post('/', (req,res,next) =>{
    const post = new Comment({
        commenter: req.body.id,
        comment: req.body.comment,
    });
    post.save()
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((error)=>{
            console.error(error);
            next(error)
        })
})

module.exports = router;
