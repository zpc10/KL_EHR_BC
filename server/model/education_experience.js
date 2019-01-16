module.exports = function(sequelize, Sequelize) {
    var education_experience = sequelize.define('education_experience', {
        id: { type: Sequelize.STRING, primaryKey: true},
        user_id: { type: Sequelize.STRING},
        college: { type: Sequelize.STRING},
        qualification: { type: Sequelize.STRING},
        major: { type: Sequelize.STRING},
        start_day: { type: Sequelize.STRING},
        end_day: { type: Sequelize.STRING},
        experience: { type: Sequelize.STRING},
        create_time: { type: Sequelize.STRING}
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'education_experience',
        timestamps: false
    });
    return education_experience;
};
