require('dotenv').config();
const cors = require("cors");
const express = require('express');
const db = require('./models');
const app = express();


global.__basedir = __dirname + '/..';

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(cookieParser());
app.use(express.static(__dirname));


const port = process.env.PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
});
require('./routes/index')(app, express);


// require('./app/routes/index')(app, express);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Okay ${port}`);
    });
  })
  .catch(() => {
    console.log('Failed Connect Database');
  });
