const router = require('express').Router();
const { Order } = require('../../models');
const withAuth = require('../../utils/auth');

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