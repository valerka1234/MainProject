
module.exports = (sequelize, Sequelize) => {
  const members = sequelize.define('members', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fio: {
        type: Sequelize.STRING(150),
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
          fields: ['fio']
        }
      ]
    }
  );

  return members;
};
