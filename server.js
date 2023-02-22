const app = require('./app');

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const DB_HOST = 'mongodb+srv://Iryna:NWqTlyBjil7vWQGb@cluster0.ajpmzhv.mongodb.net/db-contacts?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
.then(() => app.listen(PORT))
.catch(error => {
  console.log(error.message);
process.exit(1);
})

