
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { User } = require('../models');

const router = express.Router();





//router.get(미들웨어1, 미들웨어2, 미들웨어3) 순으로 실행 
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
      const exUser = await User.findOne({ where: { email } });
    //   console.log(exUser) --> true, false 

      if (exUser) {
        req.flash('joinError', '이미 가입된 이메일입니다.');
        return res.redirect('/join');
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        nick,
        password: hash,
      });
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

//POST /auth/login 
router.post('/login',isNotLoggedIn, (req,res,next)=>{ //req.body.email, req.body.password
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError)=>{ //req.user 
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            res.redirect('/')
        } )
    })(req,res,next)

})

router.get('/logout', isLoggedIn, (req,res)=>{
    req.logout();
    req.session.destroy(); //req.user
    res.redirect('/')

});

//(1)
router.get('/kakao', passport.authenticate('kakao'));



//(3)
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect:'/',
}), (req,res)=>{
    res.redirect('/')
});

module.exports = router;

