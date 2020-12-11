const {
    Schema,
    model
} = require("mongoose");

const currentBookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    description: String,
    bookclub: 
        {
          type: Schema.Types.ObjectId,
          ref: "BookClub"
        }
}, {
    timestamps: true,
});

module.exports = model("CurrentBook", currentBookSchema);