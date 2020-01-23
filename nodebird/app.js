

const express = require('express');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

const indexRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post')
const { sequelize } = require('./models');
const passportConfig = require('./passport');



const app = express();
sequelize.sync();
passportConfig(passport);
// app.set한것은 추후 app.get으로 가져올수있다. 

app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views')); //이건 그 흔한 뷰폴더. views폴더 만들어 줘야겠지 ?  알아서 폴더찾아서 간다 
app.set('port', process.env.PORT || 8001); 



app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));//public 폴더도 만들어줘야겠지 ? //main.css 

app.use('/img', express.static(path.join(__dirname, 'uploads'))); //추가 //img/abc.png 서버경로와 프론트 경로를 다르게 한다 해킹방지 

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret : process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
}))


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  })


  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

//app.set으로 해둔것들 get으로 가져오자 
app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')} 번 포트에서 서버 실행중이얌~`)
})

