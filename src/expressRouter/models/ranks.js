
module.exports = (sequelize, Sequelize) => {
  const ranks = sequelize.define('ranks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notNull: true
      },
      value_full: {
        type: Sequelize.STRING(20),
        allowNull: false,
        notNull: true
      },
    characteristic: {
        type: Sequelize.STRING(300),
        allowNull: false,
        notNull: true
      },
    disadvantege: {
        type: Sequelize.STRING(200),
        allowNull: false,
        notNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NULL
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['value']
        }
      ]
    }
  );

  return ranks;
};
