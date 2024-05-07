const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb+srv://tdecarv:rCS3zdNRoeHKquqn@cluster0.1u4x1tq.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error encountered:', e));