const router = require("express").Router();
const { Menu_Item, GuestOrder, User, Table } = require("../models");

// Customer routes

router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/progress");
    return;
  }

  res.render("homepage");
});

router.get("/menu", async (req, res) => {
  try {
    const menuData = await Menu_Item.findAll();

    const menu = menuData.map((menuItem) => menuItem.get({ plain: true }));

    res.render("menu", { menu });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tab", async (req, res) => {
  try {
    const tabData = await Order.findAll({
      include: [
        {
          model: Menu_Item,
          attributes: ["dish_name", "price"],
        },
        {
          model: Table,
          attributes: ["table_number"],
        },
      ],
      where: {
        table_id: req.session.table_id,
      },
    });

    const tabItems = tabData.map((tab) => tab.get({ plain: true }));

    res.render("tab", { tabItems });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/progress", async (req, res) => {
  try {
    const progressData = await Order.findAll({
      include: [
        {
          model: Menu_Item,
          attributes: ["dish_name"],
        },
        {
          model: Table,
          attributes: ["table_number"],
        },
      ],
      where: {
        table_id: req.session.table_id,
      },
    });

    const progressItems = progressData.map((progress) =>
      progress.get({ plain: true })
    );

    res.render("progress", { progressItems });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Server routes

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/control");
    return;
  }

  res.render("login");
});

router.get("/control", async (req, res) => {
  try {
    const orderData = await GuestOrder.findAll({
      where: {
        status: "ORDERED",
      },
    });

    const orders = orderData.map((order) => order.get({ plain: true }));

    res.render("control", { orders });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
