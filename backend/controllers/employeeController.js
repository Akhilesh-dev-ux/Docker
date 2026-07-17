const employeeModel = require("../models/employeeModel");

exports.getEmployees = (req, res) => {
    employeeModel.getAllEmployees((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.getEmployee = (req, res) => {
    employeeModel.getEmployeeById(req.params.id, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.createEmployee = (req, res) => {
    employeeModel.createEmployee(req.body, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: "Employee Created",
            id: results.insertId
        });
    });
};

exports.updateEmployee = (req, res) => {
    employeeModel.updateEmployee(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: "Employee Updated"
        });
    });
};

exports.deleteEmployee = (req, res) => {
    employeeModel.deleteEmployee(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: "Employee Deleted"
        });
    });
};
