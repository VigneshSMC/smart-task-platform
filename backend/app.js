const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use("/api", userRoutes )
app.use('/task', taskRoutes)

app.get("/", (req, res) => {

 res.json({
   success: true,
   message:
     "Smart Task Management API Running"
 });
});

module.exports = app;
