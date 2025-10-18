// Step 1
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ email, password: hash });
    return res
      .status(201)
      .json({
        message: "User created successfully",
        userId: user._id.toString(),
        email: user.email,
        createdAt: user.createdAt,
      });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({
      token,
      tokenType: "Bearer",
      expiresIn: process.env.JWT_EXPIRES || "1h",
      user: { userId: user._id.toString(), email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function testJWT(req, res) {
  return res.json({ ok: true, userId: req.used });
}

module.exports = { signup, login, testJWT };
