var express = require('express');
var router = express.Router();
var {User} = require('../models'); // 그래서 모델 도 라우트로 불러와야 되는구나 . 

/* GET home page. */
router.get('/', function(req, res, next) {

  User.findAll()    // 이거때매 3줄 모델 불러오는것.
    .then((users)=>{
      res.render('sequelize', { title: '시퀄 연습 ', users: users}); // users 배열은 sequelize.pug에 있는 users배열과 매칭   // users 만 해도 됨. (ES6 )
    })
    .catch((err)=>{
      console.error(err);
      next(err);
    })
  
  
});

module.exports = router;
