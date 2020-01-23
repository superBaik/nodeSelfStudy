var express = require('express');


var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    //애초에 뛰울떄 모든 데이터들을보여주겟다 
  User.find({})
    .then((users)=>{
        res.json(users);
    })
    .catch((error)=>{
        console.error(error);
        next(error);
    })


});

router.post('/', function(req, res, next) {
  
    const user = new User({  //이런게 쿼리를 수행한다고 하는구나. 프론트에서 값을 받아와서 모델에다가 짚어넣는 작업 
        name : req.body.name,
        age : req.body.age,
        married : req.body.married,
    })
    user.save()
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch((error)=>{
            console.error(error);
            next(error)
        })


});

module.exports = router;
