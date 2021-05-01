const router = require('express').Router();
const { Order, OrderItem, Table } = require('../../models');

// Route for creating new Order database entry
router.post('/', async (req, res) => {
  try {
    const OrderData = await Order.create(req.body);
    res.status(200).json(OrderData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for table logging in
router.post('/login', async (req, res) => {
  try {
    const tableData = await Table.findOne({ where: { table_id: req.body.table_id } });

    if (!tableData) {
      res
        .status(400)
        .json({ message: 'Incorrect table or password, please try again' });
      return;
    }

    const validPassword = await tableData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect table or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route for adding individual items to order
router.post('/orderitem', async (req, res) => {
  try {
    const OrderItemData = await OrderItem.create(req.body);
    res.status(200).json(OrderItemData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for updating status of order
router.put('/:id', async (req, res) => {
  try {
    const statusUpdate = await Order.update(
    {
      status: req.body.status
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

// Route to delete Order table
router.delete('/delete/:id', async (req, res) => {
  try {
    const orderData = await Order.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!orderData) {
      res.status(404).json({ message: 'No order found with this id!' });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});