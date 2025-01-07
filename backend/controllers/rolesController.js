const jwt = require("jsonwebtoken");
const User = require("../model/User");

const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

const upgrade = async (req, res) => {
  try {
    const { userId, permission } = req.body;

    if (!["Editor", "Admin"].includes(permission)) {
      return res
        .status(400)
        .json({ message: "Invalid permission to upgrade to." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.roles[permission]) {
      return res
        .status(400)
        .json({ message: `User already has the ${permission} role.` });
    }
    const updatedRoles = { ...user.roles };
    updatedRoles[permission] = ROLES_LIST[permission];
    user.roles = updatedRoles;
    // create JWTs
    const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          roles: roles,
          userId: user._id.toString(),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" },
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    // Saving refreshToken with current user
    user.refreshToken = [...[], refreshToken];
    const result = await user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // Prevents access via JavaScript
      secure: true, // Ensures it is only sent over HTTPS
      sameSite: "None", // Cross-site cookie setting, required for modern browsers
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    console.log(result);

    res.json({
      message: `User upgraded to ${permission} role.`,
      accessToken,
    });
  } catch (error) {
    console.error("Error upgrading permission:", error);
    res
      .status(500)
      .json({ message: "Error upgrading permission", error: error.message });
  }
};
const remove = async (req, res) => {
  try {
    const { userId, permission } = req.body;

    if (!["Editor", "Admin"].includes(permission)) {
      return res.status(400).json({ message: "Invalid permission to remove." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.roles[permission]) {
      return res
        .status(400)
        .json({ message: `User does not have the ${permission} role` });
    }

    const updatedRoles = { ...user.roles };
    delete updatedRoles[permission];
    await User.findByIdAndUpdate(
      userId,
      { roles: updatedRoles },
      { new: true },
    );
    // create JWTs
    const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          roles: roles,
          userId: user._id.toString(),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" },
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    // Saving refreshToken with current user
    user.refreshToken = [...[], refreshToken];
    const result = await user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // Prevents access via JavaScript
      secure: true, // Ensures it is only sent over HTTPS
      sameSite: "None", // Cross-site cookie setting, required for modern browsers
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    console.log(result);

    res.json({
      message: `User removed ${permission} role.`,
      accessToken,
    });
  } catch (error) {
    console.error("Error removing permission:", error);
    res
      .status(500)
      .json({ message: "Error removing permission", error: error.message });
  }
};

module.exports = { upgrade, remove };
