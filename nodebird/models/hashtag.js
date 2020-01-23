module.exports = ((sequelize,DataTypes)=> (
    sequelize.define('hashtag', {
        title:{
            type: DataTypes.STRING(15),
            allowNull : false,
            unique: true,
        },
        
    }, {
        timestamps: true, //생성일, 수정일
        paranoid:true, //삭제일(복구용)
    })  

));