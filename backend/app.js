require("dotenv").config();

const express = require("express");
require("./config/db");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Employee Management API is running"
    });
});

app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
