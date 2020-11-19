const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect('mongodb://localhost/zodiac-match', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Successfully connected to the DB 💾`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to the DB 💾: `, error);
    process.exit(1);
  });