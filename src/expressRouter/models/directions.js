
module.exports = (sequelize, Sequelize) => {
  const directions = sequelize.define('directions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      num: {
        type: Sequelize.STRING(10),
        allowNull: false,
        notNull: true
      },
      value: {
        type: Sequelize.STRING(100),
        allowNull: false,
        notNull: true
      },
      id_faculties: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'faculties',
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
          fields: ['num','value','id_faculties']
        }
      ]
    }
  );

  return directions;
};
