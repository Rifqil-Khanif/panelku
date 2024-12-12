// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const os = require('os-utils');

// Menghubungkan ke database MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Membuat model user
const User = mongoose.model('User', {
  nama: String,
  login: String,
  password: String,
});

// Mengatur view engine
app.set('view engine', 'ejs');

// Mengatur direktori views
app.set('views', './views');

// Mengatur route untuk login admin
app.get('/login', (req, res) => {
  res.render('login');
});

// Mengatur route untuk proses login admin
app.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  // Validasi login admin
  if (login === 'admin' || login === 'admin@gmail.com' && password === '@Userzeroyt7') {
    res.redirect('/panel-admin');
  } else {
    res.render('login', { error: 'Username atau password salah' });
  }
});

// Mengatur route untuk panel admin
app.get('/panel-admin', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
    } else {
      res.render('panel-admin', { users });
    }
  });
});

// Mengatur route untuk tambah user
app.get('/tambah-user', (req, res) => {
  res.render('tambah-user');
});

// Mengatur route untuk proses tambah user
app.post('/tambah-user', (req, res) => {
  const nama = req.body.nama;
  const login = req.body.login;
  const password = req.body.password;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Membuat user baru
  const user = new User({
    nama,
    login,
    password: hashedPassword,
  });

  // Menyimpan user baru ke database
  user.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/panel-admin');
    }
  });
});

// Mengatur route untuk hapus user
app.get('/hapus-user/:id', (req, res) => {
  const id = req.params.id;

  // Mencari user berdasarkan id
  User.findByIdAndRemove(id, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/panel-admin');
    }
  });
});

// Mengatur route untuk lihat password user
app.get('/lihat-password/:id', (req, res) => {
  const id = req.params.id;

  // Mencari user berdasarkan id
  User.findById(id, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      res.render('lihat-password', { user });
    }
  });
});

// Mengatur route untuk grafik CPU dan RAM
app.get('/grafik', (req, res) => {
  os.cpuUsage((cpuUsage) => {
    os.freemem((freemem) => {
      res.render('grafik', { cpuUsage, freemem });
    });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
