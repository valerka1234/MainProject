
var express = require('express'),
    Router = express.Router(),

    db = require('../../config/db_config');
    faculties = db.faculties;
    directions = db.directions;
    profiles = db.profiles;
    groups = db.groups;
    plans = db.plans;
    ranks = db.ranks;
    tickets = db.tickets;
    distributions = db.distributions;
    students = db.students;
    members = db.members;
    comissions = db.comissions;
    gradings = db.gradings;
    Op = db.Sequelize.Op;
    sequelize = db.sequelize;

// Get faculties
Router.route('/get_faculties').get(function (request, response) {
  faculties.hasMany(directions, { foreignKey: 'id_faculties' });
  faculties.findAll(
    {
      include: [
        {
          model: directions,
          required: true
        }
      ],
      order: ['id']
    })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            value: String(JSON.stringify(result.dataValues.value)).replace(/\"/g,''),
            directions: JSON.parse(JSON.stringify(result.dataValues.directions.map(direction => Number(direction.id))))
          }
        })
      )
    })
});

// Get directions
Router.route('/get_directions').get(function (request, response) {
  directions.hasMany(profiles, { foreignKey: 'id_directions' });
  directions.findAll(
    {
      include: [
        {
          model: profiles,
          required: true
        }
      ],
      order: ['id']
    })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            num: String(JSON.stringify(result.dataValues.num)).replace(/\"/g,''),
            value: String(JSON.stringify(result.dataValues.value)).replace(/\"/g,''),
            id_faculties: Number(JSON.stringify(result.dataValues.id_faculties)),
            profiles: JSON.parse(JSON.stringify(result.dataValues.profiles.map(profile => Number(profile.id))))
          }
        })
      )
    })
});

// Get profiles
Router.route('/get_profiles').get(function (request, response) {
  profiles.hasMany(groups, { foreignKey: 'id_profiles' });
  profiles.findAll(
    {
      include: [
        {
          model: groups,
          required: true,
          order: ['id']
        }
      ],
      order: ['id']
    })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            value: String(JSON.stringify(result.dataValues.value)).replace(/\"/g,''),
            id_directions: Number(JSON.stringify(result.dataValues.id_directions)),
            groups: JSON.parse(JSON.stringify(result.dataValues.groups.map(group => Number(group.id))))
          }
        })
      )
    })
});

// Get groups by code
Router.route('/get_groups_code/:code').get(function (request, response) {
  groups.hasMany(plans, { foreignKey: 'id_groups' });
  groups.findAll(
    {
      include: [
        {
          model: plans,
          required: true,
          order: ['date'],
          where: {
            id_groups: request.params.code,
            type: 'exam'
          }
        }
      ]
    })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            group: String(JSON.stringify(result.dataValues.group)).replace(/\"/g,''),
            type: String(JSON.stringify(result.dataValues.type)).replace(/\"/g,''),
            program: String(JSON.stringify(result.dataValues.program)).replace(/\"/g,''),
            id_profiles: Number(JSON.stringify(result.dataValues.id_profiles)),
            date_exam: JSON.parse(JSON.stringify(result.dataValues.plans.map(plan => String(plan.date))))
          }
        })
      )
    })
});

// Get groups by date
Router.route('/get_groups_date/:date').get(function (request, response) {
  groups.hasMany(plans, { foreignKey: 'id_groups' });
  groups.findAll(
    {
      include: [
        {
          model: plans,
          required: true,
          order: ['type','date'],
          where: {
            date: request.params.date
          }
        }
      ],
      order: [
        'id'
      ]
    })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            group: String(JSON.stringify(result.dataValues.group)).replace(/\"/g,''),
            type: String(JSON.stringify(result.dataValues.type)).replace(/\"/g,''),
            program: String(JSON.stringify(result.dataValues.program)).replace(/\"/g,''),
            id_profiles: Number(JSON.stringify(result.dataValues.id_profiles)),
            date_exam: JSON.parse(JSON.stringify(result.dataValues.plans.filter(plan => plan.type.indexOf('exam') !== -1).map(plan => String(plan.date)))),
            date_qualify_work: JSON.parse(JSON.stringify(result.dataValues.plans.filter(plan => plan.type.indexOf('qual') !== -1).map(plan => String(plan.date))))
          }
        })
      )
    })
});

// Get ranks
Router.route('/get_ranks').get(function (request, response) {
  ranks.findAll({})
    .then(results => {
      response.json(results
        .map(result => {
          return {
            value: Number(JSON.stringify(result.dataValues.value)),
            value_full: String(JSON.stringify(result.dataValues.value_full)).replace(/\"/g, ''),
            characteristic: String(JSON.stringify(result.dataValues.characteristic)).replace(/\"/g, ''),
            disadvantege: String(JSON.stringify(result.dataValues.disadvantege)).replace(/\"/g, '')
          }
        })
      )
    })
});

// Get comissions by direction
Router.route('/get_comissions/:direction/:year').get(function (request, response) {
  members.hasMany(comissions, { foreignKey: 'id_member' });
  members.findAll({
    include: [
      {
        model: comissions,
        required: true,
        where: {
          id_direction: request.params.direction,
          year: request.params.year
        }
      }
    ]
  })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            fio: String(JSON.stringify(result.dataValues.fio)).replace(/\"/g, ''),
            role: String(JSON.stringify(result.dataValues.comissions[0].role)).replace(/\"/g, ''),
            id_comission: Number(JSON.stringify(result.dataValues.comissions[0].id))
          }
        })
      )
    })
});

// Get tickets by group
Router.route('/get_tickets/:code').get(function (request, response) {
  distributions.hasMany(tickets, { foreignKey: 'id_distributions', sourceKey: 'num' });
  distributions.findAll(
    {
      include: [
        {
          model: tickets,
          required: true
        }
      ],
      where: {
        id_group: request.params.code
      }
    })
    .then(results => {
      response.json(results
        .map(result => {
          return result.dataValues.tickets.map(ticket => {
            return {
              code: Number(JSON.stringify(ticket.id)),
              number: Number(JSON.stringify(ticket.number)),
              first_question: String(JSON.stringify(ticket.first_question)).replace(/\"/g,''),
              second_question: String(JSON.stringify(ticket.second_question)).replace(/\"/g,''),
              third_question: String(JSON.stringify(ticket.third_question)).replace(/\"/g,'')
            }
          })
        })
      )
    })
});

// Get students by group
Router.route('/get_students/:id').get(function (request, response) {
  students.findAll({
    where: {
      id_group: request.params.id
    }
  })
    .then(results => {
      response.json(results
        .map(result => {
          return {
            code: Number(JSON.stringify(result.dataValues.id)),
            fio: String(JSON.stringify(result.dataValues.fio)).replace(/\"/g,''),
            protocol: Number(JSON.stringify(result.dataValues.protocol)),
            ticket: Number(JSON.stringify(result.dataValues.ticket)),
            result: Number(JSON.stringify(result.dataValues.result))
          }
        })
      )
    })
});

// Get students by group
Router.route('/get_students_rate/:id').get(function (request, response) {
  students.hasMany(gradings, { foreignKey: 'id_student' });
  gradings.belongsTo(comissions, { foreignKey: 'id_comission' });
  comissions.belongsTo(members, { foreignKey: 'id_member' });
  students.findAll({
    where: {
      id_group: request.params.id
    },
    include: [
      {
        model: gradings,
        required: true,
        attributes: ['id', 'question', 'result'],
        include: [
          {
            model: comissions,
            required: true,
            attributes: ['id_member'],
            include: [
              {
                model: members,
                required: true,
                attributes: ['fio']
              }
            ]
          }
        ],
      }
    ],
    attributes: ['id', 'fio', 'result']
  })
    .then(results => {
      response.json(results
        .map(result => {
          return result.dataValues;
        })
      )
    })
});

// Set ticket for students
Router.route('/set_ticket_by_student/:id').post(function (request, response) {
  students.update(
    {
      ticket: request.body.number
    },
    { where: { id: request.params.id}}
  )
    .then(results => {
      response.json(results);
    })
    .error( error => {
      console.log('Error');
      }
    )
});

// Set comission for student in grading
Router.route('/set_comission_by_gradings/:id').post(function (request, response) {
  gradings.update(
    {
      id_comission: request.body.number
    },
    { where: { id_student: request.params.id}}
  )
    .then(results => {
      response.json(results);
    })
    .error( error => {
        console.log('Error');
      }
    )
});

// Create ranks by question for student
Router.route('/create_ranks').put(function (request, response) {
  gradings.create({
    id_student: request.body.id_stud,
    id_comission: request.body.id_com,
    question: request.body.question,
    result: request.body.result
  })
    .then(results => {
      response.json(results);
    })
    .error( error => {
        console.log('Error');
      }
    )
});

// Set ranks by question for student
Router.route('/set_ranks/:id/:question').post(function (request, response) {
  gradings.update(
    {
      result: request.body.number
    },
    { where: {
        id_student: request.params.id,
        question: request.params.question
      }
    }
  )
    .then(results => {
      response.json(results);
    })
    .error( error => {
        console.log('Error');
      }
    )
});

// Delete ranks by question for student
Router.route('/delete_ranks/:id/:question').delete(function (request, response) {
  gradings.destroy({
    where: {
      id_student: request.params.id,
      question: request.params.question
    },
  })
    .then(results => {
      response.json(results);
    })
    .error( error => {
        console.log('Error');
      }
    )
});

// Set result ranks for student
Router.route('/set_result/:id').post(function (request, response) {
  students.update(
    {
      result: request.body.number
    },
    { where: { id: request.params.id}}
  )
    .then(results => {
      response.json(results);
    })
    .error( error => {
        console.log('Error');
      }
    )
});

// Set protocol for student
Router.route('/set_protocol/:id').post(function (request, response) {
  students.update(
    {
      protocol: request.body.number
    },
    { where: { id: request.params.id}}
  )
    .then(results => {
      response.json(results);
    })
    .error( error => {
        console.log('Error');
      }
    )
});

module.exports = Router;
