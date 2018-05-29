
module.exports = (sequelize, Sequelize) => {
  const gradings = sequelize.define('gradings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_student: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        }
      },
      id_comission: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'comissions',
          key: 'id'
        }
      },
      question: {
        type: Sequelize.ENUM,
        allowNull: false,
        notNull: true,
        values: ['1','2','3']
      },
      result: {
        type: Sequelize.INTEGER,
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
    }
  );

  return gradings;
};
