const { Schema, model } = require("mongoose");

const meetingSchema = new Schema(
  {
    date: Date,
    time: String,
    link: String,
    bookclub: 
        {
          type: Schema.Types.ObjectId,
          ref: "BookClub"
        }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Meeting", meetingSchema);