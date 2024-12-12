const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const mainRoute = require('./routes/mainRoute');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/', mainRoute);

app.listen(port, () => {
  console.log(`Aplikasi berjalan pada port ${port}`);
});
