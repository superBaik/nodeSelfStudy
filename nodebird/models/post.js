module.exports = ((sequelize,DataTypes)=> (
    sequelize.define('post', {
        content:{
            type: DataTypes.STRING(140),
            allowNull : false,
        },
        img:{
            type: DataTypes.STRING(200),
            allowNull: true,
        }
        
    }, {
        timestamps: true, //생성일, 수정일
        paranoid:true, //삭제일(복구용)
    })  

));