
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const { Post, User } = require('../models');

//프로필 페이지 

router.get('/profile',isLoggedIn, (req,res)=>{
    res.render('profile', { title: '내 정보 -Node Bird ', user: req.user })
})

router.get('/', (req, res, next) => {
    Post.findAll({
      include: [{ //작성자 
        model: User,
        attributes: ['id', 'nick'],
      },{   //좋아요 누른사람 
          model: User,
          attributes: ['id', 'nick'], 
          as:'Liker',
      }],
      order: [['createdAt', 'DESC']],
    })
      .then((posts) => {
        res.render('main', {
          title: 'NodeBird',
          twits: posts,
          user: req.user,
          loginError: req.flash('loginError'),
        });
      })
      .catch((error) => {
        console.error(error);
        next(error);
      });
  });

//회원가입 페이지 
router.get('/join', isNotLoggedIn, (req, res)=>{
    res.render('join', {
        title: '회원가입 - 뷁세NodeBird ',
        user : req.user,
        joinError: req.flash('joinError'),
    });

})


// router.get('/', (req,res,next)=>{
//     res.render('main', {
//         title: 'NodeBird_Baik',
//         twits: [],
//         user: req.user,
//         loginError: req.flash('loginError'),
//     });
// });




module.exports = router;

