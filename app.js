const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
//database connection
const sequelize = require('./db');
const Student = require('./models/student');
const Teacher = require('./models/teacher');

// Sync models to create tables
sequelize.sync({ force: true }) // Use `force: true` to recreate tables each time for this example
  .then(() => {
    console.log('Database and tables created');
  })
  .catch(err => {
    console.error('Error creating database tables:', err);
  });

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
