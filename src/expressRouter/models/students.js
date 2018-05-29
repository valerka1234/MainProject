
module.exports = (sequelize, Sequelize) => {
  const students = sequelize.define('students', {
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
      id_group: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id'
        }
      },
      protocol: {
        type: Sequelize.INTEGER,
        allowNull: true,
        notNull: false
      },
      ticket: {
        type: Sequelize.INTEGER,
        allowNull: true,
        notNull: false
      },
      result: {
        type: Sequelize.INTEGER,
        allowNull: true,
        notNull: false
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
          fields: ['fio','id_group']
        }
      ]
    }
  );

  return students;
};
