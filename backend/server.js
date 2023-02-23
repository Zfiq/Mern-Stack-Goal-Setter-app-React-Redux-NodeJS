const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config(); // For variables in it
const { errorHandler } = require("./middleware/errorMiddleware"); // imort errorHandler fun from errorMiddleware.js
const connectDB = require("./config/db"); // Import Mongo connection
const port = process.env.PORT || 5000; // Run port from .env

connectDB();

const app = express();

app.use(express.json()); // Middleware to read the body text from api send response
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes")); // get routes from route file
app.use("/api/users", require("./routes/userRoutes")); // get user route from userRoutes file.
app.use(errorHandler); // call errorHandler function
app.listen(port, () => console.log(`Server started on port  ${port}`));
