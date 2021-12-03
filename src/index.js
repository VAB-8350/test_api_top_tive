const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { mongo } = require('./keys');
const cors = require('cors');

import { createRoles } from './libs/initialSetup'
createRoles();

//connecting to db
mongoose.connect(mongo.URI)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));


//setings
app.set('port', process.env.PORT || 8000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
  
//routes
app.use('/api/books', require('./routes/books.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port '+ app.get('port'));
});