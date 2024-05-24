const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/Edusity')
//   .then(() => console.log('Connected!'));
const uri = "mongodb+srv://baisa007:baisa007@cluster0.bc5uahx.mongodb.net/"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,  // Adjust the timeout value as needed
  socketTimeoutMS: 45000,          // Optional: Ensure socket timeout is appropriate
  // More options if needed
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
