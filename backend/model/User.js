const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: function () {
      // Require password only if the user is not using OAuth
      return !this.googleId;
    },
  },
  refreshToken: [String],
  googleId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
