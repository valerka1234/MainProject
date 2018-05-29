
module.exports = (sequelize, Sequelize) => {
  const profiles = sequelize.define('profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notNull: true
      },
      id_directions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'directions',
          key: 'id'
        }
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
          fields: ['value','id_directions']
        }
      ]
    }
  );

  return profiles;
};
