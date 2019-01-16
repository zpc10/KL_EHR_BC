module.exports = function(sequelize, Sequelize) {
    var work_experience = sequelize.define('work_experience', {
        id: { type: Sequelize.STRING, primaryKey: true},
        user_id: { type: Sequelize.STRING},
        company: { type: Sequelize.STRING},
        industry: { type: Sequelize.STRING},
        occupation: { type: Sequelize.STRING},
        salary: { type: Sequelize.STRING},
        start_day: { type: Sequelize.STRING},
        end_day: { type: Sequelize.STRING},
        experience: { type: Sequelize.STRING},
        create_time: { type: Sequelize.STRING}
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'work_experience',
        timestamps: false
    });
    return work_experience;
};
