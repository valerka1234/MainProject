
module.exports = (sequelize, Sequelize) => {
  const tickets = sequelize.define('tickets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notNull: true
      },
      first_question: {
        type: Sequelize.STRING(500),
        allowNull: false,
        notNull: true
      },
      second_question: {
        type: Sequelize.STRING(500),
        allowNull: false,
        notNull: true
      },
      third_question: {
        type: Sequelize.STRING(500),
        allowNull: false,
        notNull: true
      },
      id_distributions: {
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
    }, {
      indexes: [
        {
          unique: true,
          fields: ['number','id_distributions']
        }
      ]
    }
  );

  return tickets;
};
