
module.exports = (sequelize, Sequelize) => {
  const faculties = sequelize.define('faculties', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.STRING(50),
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

  return faculties;
};
