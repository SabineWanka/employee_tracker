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


// view all employees with there department and role, joining tables 
viewAllEmployee() {
    return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name   FROM employee", function (err, res) {


    });
}

// view all possible managers
viewAllManagers(employeeID){
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

// Delete a role 
deleteRole(roleId){
    return this.connection.query("DELETE FROM role WHERE id =?",
        roleId
    );
}



