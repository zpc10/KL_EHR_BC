module.exports = function(sequelize, Sequelize) {
    var comment = sequelize.define('comment', {
        id: { type: Sequelize.STRING, primaryKey: true},
        user_id: { type: Sequelize.STRING},
        ref_busi_type: { type: Sequelize.STRING},
        ref_busi_id: { type: Sequelize.STRING},
        star_level: { type: Sequelize.STRING},
        content: { type: Sequelize.STRING},
        star_level: { type: Sequelize.STRING},
        status: { type: Sequelize.STRING},
        create_time: { type: Sequelize.STRING},
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'comment',
        timestamps: false
    });
    return comment;
};
