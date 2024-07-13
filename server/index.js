if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { connectDB } = require('./config/mongoDb');
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes");

const port = process.env.PORT|| 3000
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(router)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;