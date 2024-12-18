// server.js
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authenticationRoutes = require("./routes/authenticationRoutes");
const authorizedRoutes=require("./routes/authorizedRoutes")
const patientRoutes=require('./routes/patientRoutes')

//
  const testRoutes = require('./routes/testRoutes');
//

const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001" || "http://localhost:3000";
const app = express();
app.use(cookieParser());
// Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials:true
  })
);

app.use(express.json());  // Middleware for parsing JSON request bodies
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));  // Logging requests

// MongoDB Connection
mongoose.connect(`${process.env.DB_URL}`)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// Routes
app.use("/auth/", authenticationRoutes); // Prefixing all routes with /auth
app.use("/users/",authorizedRoutes);
app.use('/patient',patientRoutes)
app.use('/test',testRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});
