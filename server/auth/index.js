const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

// Register a new instructor account
router.post("/register", async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: { username: req.body.username, password: req.body.password },
    });

    // Create a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res
      .status(201)
      .send({ token, user: { userId: user.id, username: user.username } });
  } catch (error) {
    next(error);
  }
});

// Login to an existing user account
router.post("/login", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username, password: req.body.password },
    });

    if (!user) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the user id
    const token = jwt.sign({ id: user.id }, process.env.JWT);

    res.send({ token, user: { userId: user.id, username: user.username } });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in user
router.get("/me", async (req, res, next) => {
  console.log(req.user);
  if (!req.user) {
    return res.send({});
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
