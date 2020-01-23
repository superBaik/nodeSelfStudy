

const mongoose = require('mongoose');

module.exports =()=>{

    const connect =()=>{
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
          }
    
        
        mongoose.connect('mongodb://localhost:27017/admin', {
            dbName : 'nodejs'
        }, (error) => {
            if(error){
    
                console.log('mongo error fuck ',error)
    
            } else{
                console.log('mongo good success good boy')
            }
        });
    }
   
    
    connect();

    
    mongoose.connection.on('error', (error)=>{
        console.error('mongodb connection error ')
    });

    mongoose.connection.on('disconnected', (error)=>{
        console.error('mongodb connection error, AGAIN TRYING TO CONNECT ');

        connect();

    })

    require('./user');  //이제 몽구스를 이용해 스키마들을 가져온다는 거 ~ ~ 
    require('./comment');

}