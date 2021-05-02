const router = require("express").Router();
const { Order, Menu_Item, Table } = require("../../models");

// Route for creating new Table database entry
router.post("/", async (req, res) => {
  try {
    const tableData = await Table.create(req.body);
    res.status(200).json(tableData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for table logging in
router.post("/login", async (req, res) => {
  try {
    const tableData = await Table.findOne({
      where: { table_number: req.body.table_number },
    });

    if (!tableData) {
      res
        .status(400)
        .json({ message: "Table does not exist, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.table_id = tableData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route for adding individual items to order
router.post("/order", async (req, res) => {
  try {
    const orderData = await Order.create(req.body);
    res.status(200).json(orderData);
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

// Route for deleting orders from cart
router.delete("/deleteitem/:id", async (req, res) => {
  try {
    const itemData = await Order.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: "No item found with this id!" });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;