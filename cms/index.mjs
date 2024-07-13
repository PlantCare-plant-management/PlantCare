import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";
import db from "./db/conn.mjs";
import Users from "./controllers/usersController.mjs";
import { Plant } from "./controllers/plantController.mjs";

const port = process.env.PORT|| 3000
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Load the /posts routes

app.get('/', Users.getUsers)
app.post('/register', Users.register)
app.post('/login', Users.login)

app.get('/plants', Plant.getPlant)

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500)
})

// start the Express server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});