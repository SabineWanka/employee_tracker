const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "password",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});


// find all employees with there department and role, joining tables 
findAllEmployees() {
    return this.connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}

// view all possible managers
findAllManagers(employeeID){
    return this.connection.query("SELECT id, first_name, last_name FROM employee WHERE id = ?",
        employeeID
    );
}

// Create a new employee
createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?",
        employee
    );
}

// Update the given employee's role
updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
    );
}
//delete an employee 
deleteEmployee(employeeId) {
    return this.connection.query(
        "DELETE employee WHERE id = ?",
        employeeId
    );
}
//find all departments // Find all departments, join with employees 
findAllDepartments() {
    return this.connection.query(
        "SELECT department.id, department.name, FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
}

// Create a new department
createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
}

// delete department 
deleteDepartment(departmentID){
    return this.connection.query("Delete FROM department WHERE id = ?",
        departmentId)
}

// Create a new role
createRole(role) {
    return this.connection.query("INSERT INTO role SET ?",
        role
    );
}
//find all roles, need to join with department to see department name 
findAllRoles() {
    return this.connection.query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
}

// Delete a role 
deleteRole(roleId){
    return this.connection.query("DELETE FROM role WHERE id =?",
        roleId
    );
}



