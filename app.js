// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Mengatur koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Koneksi ke database berhasil');
})
.catch((err) => {
  console.log('Kesalahan koneksi ke database:', err);
});

// Mengatur view engine
app.set('view engine', 'ejs');

// Mengatur direktori views
app.set('views', './views');

// Mengatur route
const mainRoute = require('./routes/mainRoute');
app.use('/', mainRoute);

// Mengatur port
const port = process.env.PORT || 8080;

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
