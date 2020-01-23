

module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        age:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: true,

        },
        create_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()') //sequelize에게 직접 알아내라. 
        }
    },{
        timestamps: false,
        underscored: true,
    });
};


//users 테이블 
// 이름, 나이, 결혼여부, 댓글, 생성일 

