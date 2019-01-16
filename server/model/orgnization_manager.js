module.exports = function(sequelize, Sequelize) {
    var orgnization_manager = sequelize.define('orgnization_manager', {
        id: { type: Sequelize.STRING, primaryKey: true},
        orgnization_id: { type: Sequelize.STRING},
        code: { type: Sequelize.STRING},
        name: { type: Sequelize.STRING},
        password: { type: Sequelize.STRING},
        duty: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        mobile: { type: Sequelize.STRING },
        remark: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        create_time: { type: Sequelize.STRING}
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'orgnization_manager',
        timestamps: false
    });
    return orgnization_manager;
};
