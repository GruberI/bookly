const {
    Schema,
    model
} = require("mongoose");

const bookClubSchema = new Schema({
    name: String, //book club name
    members: [{
        type: Schema.Types.ObjectId,
        password: String,
        ref: "User",
    }],
    meeting: {
        type: Schema.Types.ObjectId,
        ref: "Meeting"
    },
    currentBook: {
        type: Schema.Types.ObjectId,
        ref: "CurrentBook"
    }
}, {
    timestamps: true,
});

module.exports = model("BookClub", bookClubSchema);