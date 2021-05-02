const router = require('express').Router();
const { Order, Menu_Item, Table } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const orderData = await Order.findAll({
      include: [
        {
          model: Menu_Item,
          attributes: ['dish_name'],
        },
        {
          model: Table,
          attributes: ['table_number']
        }
      ],
    });

    // Serialize data so the template can read it
    const orders = orderData.map((order) => order.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('control', { 
      orders, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for updating status of order
router.put("/:id", async (req, res) => {
  try {
    const statusUpdate = await Order.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(OrderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;