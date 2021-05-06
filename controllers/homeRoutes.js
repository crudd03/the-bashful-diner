const router = require("express").Router();
const { Menu_Item, GuestOrder, Staff, GuestTable } = require("../models");

// Customer routes

router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/cart");
    return;
  }

  res.render("landing");
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

router.get("/bill", async (req, res) => {
  try {
    const billData = await GuestOrder.findAll({
      include: [
        {
          model: Menu_Item,
          attributes: ["dish_name", "price"],
        },
        {
          model: GuestTable,
          attributes: ["table_number"],
        },
      ],
      where: {
        // table_id: req.session.table_id,
        table_id: 2,
      },
    });

    const billItems = billData.map((bill) => bill.get({ plain: true }));

    res.render("bill", { billItems });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cartData = await GuestOrder.findAll({
      include: [
        {
          model: Menu_Item,
        },
        {
          model: GuestTable,
        },
      ],
      where: {
        table_id: req.session.table_id,
        status: "PENDING",
        // table_id: 2,
      },
    });

    const cartItems = cartData.map((cart) => cart.get({ plain: true }));

    res.render("cart", { cartItems });
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
      include: [
        {
          model: Menu_Item,
        },
        {
          model: GuestTable,
        },
      ],
      where: {
        status: "ORDERED",
      },
    });

    const orders = orderData.map((order) => order.get({ plain: true }));
    console.log(orders);
    res.render("control", { orders });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
