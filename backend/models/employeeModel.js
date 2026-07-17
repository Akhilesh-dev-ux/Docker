const db = require("../config/db");

// Get all employees
const getAllEmployees = (callback) => {
    db.query("SELECT * FROM employees", callback);
};

// Get employee by ID
const getEmployeeById = (id, callback) => {
    db.query("SELECT * FROM employees WHERE id = ?", [id], callback);
};

// Create employee
const createEmployee = (employee, callback) => {
    db.query(
        "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)",
        [employee.name, employee.email, employee.department, employee.salary],
        callback
    );
};

// Update employee
const updateEmployee = (id, employee, callback) => {
    db.query(
        "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?",
        [
            employee.name,
            employee.email,
            employee.department,
            employee.salary,
            id
        ],
        callback
    );
};

// Delete employee
const deleteEmployee = (id, callback) => {
    db.query("DELETE FROM employees WHERE id=?", [id], callback);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
