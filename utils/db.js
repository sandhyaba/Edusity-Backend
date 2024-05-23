const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Edusity')
//   .then(() => console.log('Connected!'));
const uri = "mongodb+srv://baisa007:baisa007@cluster0.bc5uahx.mongodb.net/"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
