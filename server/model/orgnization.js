module.exports = function(sequelize, Sequelize) {
    var orgnization = sequelize.define('orgnization', {
        id: { type: Sequelize.STRING, primaryKey: true},
        code: { type: Sequelize.STRING},
        name: { type: Sequelize.STRING},
        phone: { type: Sequelize.STRING},
        post_code: { type: Sequelize.STRING},
        address: { type: Sequelize.STRING},
        corp_owner_name: { type: Sequelize.STRING},
        busi_code: { type: Sequelize.STRING},
        busi_address: { type: Sequelize.STRING},
        instu_code: { type: Sequelize.STRING},
        tax_code: { type: Sequelize.STRING},
        summary: { type: Sequelize.STRING},
        linkman_name: { type: Sequelize.STRING},
        linkman_phone: { type: Sequelize.STRING},
        remark: { type: Sequelize.STRING},
        status: { type: Sequelize.STRING}
    }, {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'orgnization',
        timestamps: false
    });
    return orgnization;
};
