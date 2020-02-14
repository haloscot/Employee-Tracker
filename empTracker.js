var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
   // starting func
   main();
  });


  function main(){

    connection.query('SELECT  * FROM employee LEFT JOIN emp_role  ON employee.role_id = emp_role.id;', function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
          console.log(res[i].id + " | " + res[i].firstName + " | " + res[i].lastName + " | " + res[i].role_id + " | " + res[i].title + " | " + res[i].salary);
      }
      console.log("------------------------------------------------------------------");
  })

      inquirer
      .prompt([{
          type: "list",
          message: "Choose One:",
          name : "userChoice",
          choices:["View all employees","View all departments","View all employee roles","Add an employee","Add a department","Add an employee role","Update employee details",]
      }]).then(firstCallback);


  }

  function firstCallback(answer) {

    if (answer.userChoice === "View all employees") {

        showEmployee();
    }
    else if (answer.userChoice === "View all departments") {

        viewDepartments();
    }
    else if (answer.userChoice === "View all employee roles") {

        viewRoles();
    }
    else if(answer.userChoice==="Add an employee"){

        addEmployee();
    }
    else if(answer.userChoice==="Add a department"){

        addDepartments();
    }
    else if(answer.userChoice==="Add an employee role"){

        addRoles();
    }
    else (console.log("Oops!"))
}

function showEmployee() {


    connection.query('SELECT  * FROM employee;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].firstName + " | " + res[i].lastName + " | " + res[i].role_id);
        }
        console.log("------------------------------------------------------------------");

    })
};
function viewDepartments() {
    connection.query('SELECT  * FROM department;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].dep_name);
        }
        console.log("------------------------------------------------------------------");

    })
}
function viewRoles() {

    connection.query('SELECT  * FROM emp_role;', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
        }
        console.log("------------------------------------------------------------------");

    })
}
function addEmployee() { 
    inquirer. 
    prompt([{
        type: "input",
        message: "Enter employee First name:",
        name: "firstName"
    },
    {
    type: "input",
    message: "Enter employee last name:",
    name: "lastName"
    },{
        type: "input",
        message: "Enter employee role ID:",
        name: "roleId"

    }
    ]).then(function(answers){

        connection.query("INSERT INTO employee SET ?",
        {
            firstName: answers.firstName,
            lastName: answers.lastName,
            role_id: answers.roleId
          },
        function (err, res) {
            if (err) throw err;

            console.log(" Your new employee has been added");
            showEmployee();
            main();

        })


    })
}
function addDepartments() {
    inquirer. 
    prompt([{
        type: "input",
        message: "Enter new department name:",
        name: "depName"
    }
    ]).then(function(answer){

        connection.query("INSERT INTO department SET ?",
        {
            dep_name: answer.depName,
          },
        function (err, res) {
            if (err) throw err;

            console.log(" Your new department has been added");
            viewDepartments();
            main();

        })


    })



 }
function addRoles() {

    inquirer. 
    prompt([{
        type: "input",
        message: "Enter new role title:",
        name: "roleTitle"
    },
    {
        type: "input",
        message: "Enter the new role salary:",
        name: "roleSalary"

    },{
        type: "input",
        message: "Enter new role department ID:",
        name: "roleDePId"
    }
    ]).then(function(answer){

        connection.query("INSERT INTO emp_role SET ?",
        {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.roleDePId
          },
        function (err, res) {
            if (err) throw err;

            console.log(" Your new role has been added");
            viewRoles();
            main();

        })


    })

 }
function updateEmployeeDetails() { }