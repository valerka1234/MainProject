
module.exports = (sequelize, Sequelize) => {
  const distributions = sequelize.define('distributions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      num: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notNull: true
      },
      id_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
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
    }
  );

  return distributions;
};
