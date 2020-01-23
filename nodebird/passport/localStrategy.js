
const localStorage = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');


module.exports =(passport)=>{
    passport.use(new localStorage({
        usernameField: 'email', //req.body.email
        passwordFiled: 'password', //req.body.password
    }, async (email, password, done)=>{ //done(에러, 성공, 실패)
        try {
            const exUser = await User.findOne({where:{email}}); //db에 있는 비번 찾기 
            if(exUser){
                //비번검사
                const result = await bcrypt.compare(password, exUser.password); //사용자가 입력한 비번 vs db에 있는 비번 비교 
                if(result){ //result는 true or false 로 반환 
                    done(null, exUser);
                }else{
                    done(null, false, {message: '비번 불일치 '});
                }
            }else {
                done(null, false, {message: '미가입 회원 '});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    
    }))
}