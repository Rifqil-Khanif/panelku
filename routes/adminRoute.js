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
