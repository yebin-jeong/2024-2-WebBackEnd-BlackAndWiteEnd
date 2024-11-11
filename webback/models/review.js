const Sequelize = require('sequelize');

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Review',
      tableName: 'reviews',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Review.belongsTo(db.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    db.Review.belongsTo(db.Restaurant, {
      foreignKey: 'restaurantId',  // Review 모델에서 사용할 외래 키
      as: 'restaurant'  // 이 관계를 조회할 때 사용할 이름
  });
  }
};
