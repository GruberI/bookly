const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost/finalproject"

mongoose
  .connect(process.env.MONGO_ATLAS_URI || mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    mongoose.set('debug', true);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
