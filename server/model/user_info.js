module.exports = function(sequelize, Sequelize) {
    var user_info = sequelize.define('user_info', {
        id: { type: Sequelize.STRING, primaryKey: true},
        nick_name: { type: Sequelize.STRING},
        gender: { type: Sequelize.STRING},
        avatar_url: { type: Sequelize.STRING},
        name: { type: Sequelize.STRING},
        card_id: { type: Sequelize.STRING},
        birthday: { type: Sequelize.STRING},
        mobile: { type: Sequelize.STRING},
        qq: { type: Sequelize.STRING},
        email: { type: Sequelize.STRING},
        province: { type: Sequelize.STRING},
        city: { type: Sequelize.STRING},
        brief: { type: Sequelize.STRING},
        force: { type: Sequelize.STRING},
        coin: { type: Sequelize.STRING},
        invite: { type: Sequelize.STRING},
        mark: { type: Sequelize.STRING},
        update_is: { type: Sequelize.STRING},
        create_time: { type: Sequelize.STRING},
        last_visit_time: { type: Sequelize.STRING}
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'user_info',
        timestamps: false
    });
    return user_info;
};
