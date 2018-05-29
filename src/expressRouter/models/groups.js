
module.exports = (sequelize, Sequelize) => {
  const groups = sequelize.define('groups', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group: {
        type: Sequelize.STRING(20),
        allowNull: false,
        notNull: true
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        notNull: true,
        values: ['очная','очно-заочная','заочная']
      },
      program: {
        type: Sequelize.ENUM,
        allowNull: false,
        notNull: true,
        values: ['программа бакалавриата','программа магистратуры']
      },
      id_profiles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'profiles',
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
          fields: ['group']
        }
      ]
    }
  );

  return groups;
};
