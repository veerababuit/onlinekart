const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//Middleware

app.use(cors());
app.use(express.json());

// MongoDB connection
// username : bveerababuit
// password : m2yuHRvI2xur5pKJ
// password : 0asm1EPnaKoTRQBi
// connection string :  mongodb+srv://bveerababuit:<db_password>@cluster0.9nwqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  //Routes

  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/products', require('./routes/products'));
  app.use('/api/dashboard', require('./routes/dashboard'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));