module.exports = ((sequelize,DataTypes)=> (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull : true,
            unique: true,
        },
        nick : {
            type: DataTypes.STRING(40),
            allowNull : false,

        },
        password : {
            type: DataTypes.STRING(100),
            allowNull : true,
        },
        provider :{
            type : DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },  
        snsId :{ //카카오 예정 
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        
    }, {
        timestamps: true, //생성일, 수정일
        paranoid:true, //삭제일(복구용)
    })  

));