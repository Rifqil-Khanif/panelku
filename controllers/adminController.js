const Admin = require('../models/admin');
const User = require('../models/user');

exports.dashboard = (req, res) => {
  res.render('admin/dashboard');
};

exports.tambahUser = (req, res) => {
  res.render('admin/tambahUser');
};

exports.tambahUserPost = (req, res) => {
  const { nama, password } = req.body;
  const user = new User({ nama, password });
  user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/admin/list-user');
    }
  });
};

exports.listUser = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/listUser', { users });
    }
  });
};

exports.lihatPassword = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/lihatPassword', { user });
    }
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '@Userzeroyt7') {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('login', { error: 'Username atau password salah' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
