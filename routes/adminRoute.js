const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', (req, res) => {
  if (req.session.admin) {
    adminController.dashboard(req, res);
  } else {
    res.redirect('/login');
  }
});

router.get('/tambah-user', (req, res) => {
  if (req.session.admin) {
    adminController.tambahUser(req, res);
  } else {
    res.redirect('/login');
  }
});

router.post('/tambah-user', (req, res) => {
  if (req.session.admin) {
    adminController.tambahUserPost(req, res);
  } else {
    res.redirect('/login');
  }
});

router.get('/list-user', (req, res) => {
  if (req.session.admin) {
    adminController.listUser(req, res);
  } else {
    res.redirect('/login');
  }
});

router.get('/lihat-password/:id', (req, res) => {
  if (req.session.admin) {
    adminController.lihatPassword(req, res);
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', adminController.login);

router.get('/logout', adminController.logout);

module.exports = router;
