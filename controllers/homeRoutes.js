const router = require('express').Router();
const { Menu, Order, User } = require('../models');

// Customer routes

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/progress');
    return;
  }

  res.render('homepage');
});

router.get('/menu', async (req, res) => {
  try {
    const menuData = await Menu.findAll();

    const menuItems = menuData.map((menuItems) => menuItems.get({ plain: true }));

    res.render('menu', { menuItems });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/cart', async (req, res) => {
  try {
    // Need a way to capture information for specific table
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bill', async (req, res) => {
  try {
    // Need a way to capture information for specific table
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/progress', async (req, res) => {
  try {
    // Need a way to capture information for specific table
  } catch (err) {
    res.status(500).json(err);
  }
});

// Server routes

router.get('/restaurant', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/control');
    return;
  }

  res.render('login');
});

router.get('/control', async (req, res) => {
  try {
    const controlData = await Order.findAll({
      include: [
        {
          // model: OrderItems
        }
      ]
    });

    const controlItems = controlData.map((controlItems) => controlItems.get({ plain: true }));

    res.render('control', { controlItems });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;