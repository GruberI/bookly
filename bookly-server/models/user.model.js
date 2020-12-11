const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    bookclubs: 
        [{
          type: Schema.Types.ObjectId,
          ref: "BookClub"
        }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);