
module.exports = (sequelize, Sequelize) => {
  const plans = sequelize.define('plans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_groups: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        notNull: true
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        notNull: true,
        values: ['cons','exam','qual']
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
          fields: ['id_groups','date']
        }
      ]
    }
  );

  return plans;
};
