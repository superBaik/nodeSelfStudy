var express = require('express');

var User = require('../schemas/user'); //index에서 안가져오고 직접 가져온다 

var router = express.Router();
/* GET home page. */ 
router.get('/', function(req, res, next) {

  //애초에 뛰울떄 모든 데이터들을보여주겟다 
  User.find({ }) // 괄호()안에 {}하나써주는게 이런 큰 의미가 있었다니 !
    .then((users)=>{
      res.render('mongoose', { users}) // {users}를 다 띄워줘~~~
    })
    .catch((error)=>{
      console.error(error);
      next(error);
    })
  
});

module.exports = router;
