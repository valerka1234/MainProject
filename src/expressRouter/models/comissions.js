
module.exports = (sequelize, Sequelize) => {
  const comissions = sequelize.define('comissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'members',
          key: 'id'
        }
      },
      id_direction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'directions',
          key: 'id'
        }
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        notNull: true,
        values: ['p','c','s']
      },
      year: {
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
          fields: ['id_member','id_direction','year','role']
        }
      ]
    }
  );

  return comissions;
};
