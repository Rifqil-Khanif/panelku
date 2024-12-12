const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();

// Menghubungkan ke database MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mengatur session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Mengatur view engine
app.set('view engine', 'ejs');

// Mengatur direktori views
app.set('views', './views');

// Mengatur direktori public
app.use(express.static('./public'));

// Mengatur middleware untuk memparse request body
app.use(express.urlencoded({ extended: true }));

// Mengatur middleware untuk memparse request JSON
app.use(express.json());

// Mengatur route
const mainRoute = require('./routes/mainRoute');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');

app.use('/', mainRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

// Mengatur port
const port = process.env.PORT || 8080;

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
