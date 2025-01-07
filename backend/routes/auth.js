const User = require("../model/User");
const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authController = require("../controllers/authController");

const CLIENT_URL = "http://localhost:3000/";

router.post("/", authController.handleLogin);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  async (req, res) => {
    const foundUser = await User.findOne({
      username: req.user.username,
    }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    // create JWTs
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
          userId: foundUser._id.toString(),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" },
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = [...[], refreshToken];
    const result = await foundUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // Prevents access via JavaScript
      secure: true, // Ensures it is only sent over HTTPS
      sameSite: "None", // Cross-site cookie setting, required for modern browsers
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    console.log(result);

    // Send tokens and roles to the client via query params
    res.redirect(`${CLIENT_URL}oauth-success?accessToken=${accessToken}`);
  },
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

module.exports = router;
