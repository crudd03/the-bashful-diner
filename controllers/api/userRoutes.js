const router = require("express").Router();
const { Staff } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await Staff.findOne({
      where: { user_id: req.body.user_id },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect user or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect user or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
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
