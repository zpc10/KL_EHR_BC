module.exports = function(sequelize, Sequelize) {
    var career_intent = sequelize.define('career_intent', {
        id: { type: Sequelize.STRING, primaryKey: true},
        user_id: { type: Sequelize.STRING},
        industry: { type: Sequelize.STRING},
        place: { type: Sequelize.STRING},
        occupation: { type: Sequelize.STRING},
        salary: { type: Sequelize.STRING},
        create_time: { type: Sequelize.STRING}
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'career_intent',
        timestamps: false
    });
    return career_intent;
};
