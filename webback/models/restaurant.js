const Sequelize = require('sequelize');

module.exports = class Restaurant extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'dongguk',
      },
      
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Restaurant',
      tableName: 'restaurant',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }


  static associate(db) {
    db.Restaurant.belongsToMany(db.User, {
      foreignKey: 'restaurantId',
      as: 'Followers',
      through: 'Follow',
      timestamps: false,
    });
    db.Restaurant.hasMany(db.Review, {
      foreignKey: 'restaurantId',  // Review 모델에서 사용할 외래 키
      as: 'reviews'  // 이 관계를 조회할 때 사용할 이름
    });
}};