const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } }); //현재 나를 찾자(로그인한 사람을 찾자.) 
    await user.addFollowing(parseInt(req.params.id, 10)); //addFollowing? 
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
      const user = await User.findOne({ where: { id: req.user.id } }); //현재 나를 찾자(로그인한 사람을 찾자.) 
      await user.removeFollowing(parseInt(req.params.id, 10)); //addFollowing? 
      res.send('success');
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router.post('/profile', async(req,res,next)=>{
    try {
        await User.update({nick: req.body.nick}, {
            where: {id: req.user.id}
        });
     res.redirect('/profile')
        
    } catch (error) {
        console.error(error);
        next(error)
    }
    
})


module.exports = router;