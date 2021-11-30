const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//connecting to db
mongoose.connect('mongodb://localhost/test_api')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//setings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api/books', require('./routes/books'));

//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port '+ app.get('port'));
});