const User = require('../models/user');

exports.dashboard = (req, res) => {
  res.render('user/dashboard');
};

exports.tambahUser = (req, res) => {
  res.render('user/tambahUser');
};

exports.tambahUserPost = (req, res) => {
  const { nama, password } = req.body;
  const user = new User({ nama, password });
  user.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/user/list-user');
    }
  });
};

exports.listUser = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user/listUser', { users });
    }
  });
};

exports.lihatPassword = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.render('user/lihatPassword', { user });
    }
  });
};
