const router = require("express").Router();
const { GuestOrder, Menu_Item, GuestTable } = require("../../models");

router.get("/", async (req, res) => {
  // find all tables

  try {
    const tableData = await GuestTable.findAll({
      include: [{ model: order }],
    });
    res.status(200).json(tableData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for creating new Table database entry
router.post("/create", async (req, res) => {
  try {
    // const tableParse = JSON.parse(req.body);
    const tableData = await GuestTable.create({
      table_number: req.body.table_number,
      server_requested: false,
    });
    console.log(tableData);

    req.session.save(() => {
      req.session.table_id = tableData.id;
      req.session.logged_in = true;
      res.json({ guesttable: tableData });
    });
    req.session.table_id = tableData.id;
    req.session.logged_in = true;
    console.log(req.session);
    res.status(200).json(tableData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for table logging in
// router.post("/login", async (req, res) => {
//   try {
//     const tableData = await GuestTable.findOne({
//       where: { table_number: req.body.table_number },
//     });

//     if (!tableData) {
//       res
//         .status(400)
//         .json({ message: "Table does not exist, please try again" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.table_id = tableData.id;
//       req.session.logged_in = true;

//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

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
    const orderData = await GuestOrder.create({
      menu_item_id: req.body.menu_item_id,
      menuItemId: req.body.menu_item_id,
      table_id: req.session.table_id,
      guesttableId: req.session.table_id,
    });
    console.log(orderData);
    res.status(200).json(orderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for updating status of order
router.put("/update", async (req, res) => {
  try {
    const statusUpdate = await GuestOrder.update(
      {
        status: "ORDERED",
      },
      {
        where: {
          table_id: req.session.table_id,
          status: "PENDING",
        },
      }
    );
    console.log(req.session.table_id);
    console.log(statusUpdate);
    res.status(200).json(statusUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for updating order to complete
router.put("/complete", async (req, res) => {
  try {
    const statusUpdate = await GuestOrder.update(
      {
        status: "COMPLETED",
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    console.log(statusUpdate);
    res.status(200).json(statusUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for requesting server
router.put("/request", async (req, res) => {
  try {
    const requestUpdate = await GuestTable.update(
      {
        server_requested: true,
      },
      {
        where: {
          id: req.session.table_id,
        },
      }
    );
    console.log(req.session.table_id);
    console.log(requestUpdate);
    res.status(200).json(requestUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for completing request for server
router.put("/response", async (req, res) => {
  try {
    const responseUpdate = await GuestTable.update(
      {
        server_requested: false,
      },
      {
        where: {
          id: req.body.request_id,
        },
      }
    );
    console.log(responseUpdate);
    res.status(200).json(responseUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for updating customization
router.put("/customize", async (req, res) => {
  try {
    const customizeUpdate = await GuestOrder.update(
      {
        note: req.body.customization,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    console.log(customizeUpdate);
    res.status(200).json(customizeUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for deleting orders from cart
router.delete("/delete", async (req, res) => {
  try {
    const itemData = await GuestOrder.destroy({
      where: {
        id: req.body.id,
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
