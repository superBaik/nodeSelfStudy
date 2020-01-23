const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag,User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();


fs.readdir('uploads', (error) => {
    if (error) {
      console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('uploads');
    }
  });



const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) +  Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id, //post 와 user model의 관계때문에
    });
    const hashtags = req.body.content.match(/#[^\s#]*/g); //해쉬태그는 정규표현식으로 표현 
    if (hashtags) {
        // 안녕하세요 #노드 #익스프레스 
        // hashtag = ['#노드', '#익스프레스' ]
        //게시글과 헤쉬태그의 관계 
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({ //findOrCreate : 있으면 찾고 없으면 생성하라 
        where: { title: tag.slice(1).toLowerCase() }, //wow 
      })));
      await post.addHashtags(result.map(r => r[0])); //wow 
    }
    res.redirect('/');

  } catch (error) {
    console.error(error);
    next(error);
  }


  router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
      return res.redirect('/');
    }
    try {
      const hashtag = await Hashtag.findOne({ where: { title: query } });
      let posts = [];
      if (hashtag) {
        posts = await hashtag.getPosts({ include: [{ model: User }] });
      }
      return res.render('main', {
        title: `${query} | NodeBird`,
        user: req.user,
        twits: posts,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

  router.post('/:id/like', async(req,res,next)=>{
      try {
        const post = await Post.find({where:{id:req.params.id}});
        await post.addLiker(req.user.id)     
        res.send('ok')
      } catch (error) {
          console.error(error)
          next(error)
      }
      
  })
  router.delete('/:id/like', async (req,res,next)=>{
    try {
        const post = await Post.find({where:{id:req.params.id}});
        await post.removeLiker(req.user.id)        
        res.send('ok')
      } catch (error) {
          console.error(error)
          next(error)
      }
  })


});

module.exports = router; //이한줄을 안적어서 안되었네 