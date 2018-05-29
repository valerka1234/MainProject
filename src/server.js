
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db = require('./config/db_config');

    router = require('./expressRouter/controllers/router'),
    get_db = require('./expressRouter/controllers/db');

const app = express();
app.use(bodyParser.json());
app.use(cors());
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database is connected')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
db.sequelize.sync();

const port = process.env.PORT || 1000;

app.use('/generate_doc', router);
app.use('/get_db', get_db);

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
