
const path = require('./db'),
      Sequelize = require('sequelize');

const sequelize = new Sequelize(path.path);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/faculties
db.faculties = require('../expressRouter/models/faculties')(sequelize, Sequelize);
//Models/directions
db.directions = require('../expressRouter/models/directions')(sequelize, Sequelize);
//Models/profiles
db.profiles = require('../expressRouter/models/profiles')(sequelize, Sequelize);
//Models/groups
db.groups = require('../expressRouter/models/groups')(sequelize, Sequelize);
//Models/plans
db.plans = require('../expressRouter/models/plans')(sequelize, Sequelize);
//Models/ranks
db.ranks = require('../expressRouter/models/ranks')(sequelize, Sequelize);
//Models/tickets
db.tickets = require('../expressRouter/models/tickets')(sequelize, Sequelize);
//Models/distributions
db.distributions = require('../expressRouter/models/distributions')(sequelize, Sequelize);
//Models/students
db.students = require('../expressRouter/models/students')(sequelize, Sequelize);
//Models/members
db.members = require('../expressRouter/models/members')(sequelize, Sequelize);
//Models/comissions
db.comissions = require('../expressRouter/models/comissions')(sequelize, Sequelize);
//Models/gradings
db.gradings = require('../expressRouter/models/gradings')(sequelize, Sequelize);

module.exports = db;
