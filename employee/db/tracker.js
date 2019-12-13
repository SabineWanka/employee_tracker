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

function runSearch() {
    inquirer
        .prompt({
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                }

            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "VIEW_EMPLOYEES":
                    return viewEmployees();
                case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                    return viewEmployeesByDepartment();
                case "VIEW_EMPLOYEES_BY_MANAGER":
                    return viewEmployeesByManager();
                case "ADD_EMPLOYEE":
                    return addEmployee();
                case "REMOVE_EMPLOYEE":
                    return removeEmployee();
                case "UPDATE_EMPLOYEE_ROLE":
                    return updateEmployeeRole();
                case "UPDATE_EMPLOYEE_MANAGER":
                    return updateEmployeeManager();
                case "VIEW_DEPARTMENTS":
                    return viewDepartments();
                case "ADD_DEPARTMENT":
                    return addDepartment();
                case "REMOVE_DEPARTMENT":
                    return removeDepartment();
                case "VIEW_ROLES":
                    return viewRoles();
                case "ADD_ROLE":
                    return addRole();
                case "REMOVE_ROLE":
                    return removeRole();
                default:
                    return quit();
            }
        });

}
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



