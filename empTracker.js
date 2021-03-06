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

      inquirer
      .prompt([{
          type: "list",
          message: "Choose One:",
          name : "userChoice",
          choices:["View all employees","View all departments","View all employee roles","Add an employee","Add a department","Add an employee role","Update employee role","Delete employee from database"]
      }]).then(firstCallback);


  }

  function firstCallback(answer) {

    if(answer.userChoice === "View all employees") {

        viewEmployees();
    }
    else if(answer.userChoice === "View all departments") {

        viewDepartments();
    }
    else if(answer.userChoice === "View all employee roles") {

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
    else if(answer.userChoice === "Update employee role") {

      viewRoles1();
      updateEmployeeDetails();
    }
    else if(answer.userChoice === "Delete employee from database") {

      deleteEmployee();
    }

    else(console.log("Oops!"))
}

function viewEmployees() {
  
  connection.query('SELECT employee.id, firstName,lastName,title,dep_name FROM employee LEFT JOIN emp_role ON employee.role_id=emp_role.id LEFT JOIN department on emp_role.department_id=department.id;', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("\nEmp ID: " + res[i].id + "\nName: " + res[i].firstName + " " + res[i].lastName + "\nTitle: " + res[i].title + "\nDepartment: " + res[i].dep_name);
        console.log("-----------------------------");
    }
    main();
  })
};

function viewDepartments() {
   
  connection.query('SELECT  * FROM department;', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("\nDep ID: " + res[i].id + "\nDep Name: " + res[i].dep_name);
        console.log("-----------------------------");
    }
    main();
    })
  }
  
function viewRoles1() {

  connection.query('SELECT  * FROM emp_role;', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\nRole ID: " + res[i].id + "\nTitle: " + res[i].title + "\nSalary: " + res[i].salary + "\nDep ID: " + res[i].department_id);
      console.log("-----------------------------");
    }
  })
}

function viewRoles() {

  connection.query('SELECT  * FROM emp_role;', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\nRole ID: " + res[i].id + "\nTitle: " + res[i].title + "\nSalary: " + res[i].salary + "\nDep ID: " + res[i].department_id);
      console.log("-----------------------------");
    }
    main();
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

        connection.query("INSERT INTO employee SET?",
        {
            firstName: answers.firstName,
            lastName: answers.lastName,
            role_id: answers.roleId
          },
        function (err, res) {
            if (err) throw err;

            console.log("New employee added!");
            viewEmployees();
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

            console.log("New department added!");
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
        message: "Enter new role salary:",
        name: "roleSalary"

    },{
        type: "input",
        message: "Enter new role department ID:",
        name: "roleDepId"
    }
    ]).then(function(answer){

        connection.query("INSERT INTO emp_role SET?",
        {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.roleDepId
          },
        function (err, res) {
            if (err) throw err;

            console.log("New role added!");
            viewRoles();
            main();

        })
    })
 }

function updateEmployeeDetails() { 
  inquirer.
    prompt([{
        type: "input",
        message: "Enter employee new role id:",
        name: "roleId"
    }, {
        type: "input",
        message: "Enter employee ID",
        name: "empID"

    }, 
    ]).then(function (answer) {
      connection.query("UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.roleId
          },
          {
            id: answer.empID
            
          }
        ], function (err, res) {
            if (err) throw err;
            console.log(" New employee role updated!");
            viewEmployees();
            main();
          })
      })
}

function deleteEmployee(){

  inquirer.
  prompt([{
      type: "input",
      message: "Enter the employee ID to delete",
      name: "empID"
  }
  ]).then(function (answer) {

      connection.query("DELETE FROM employee WHERE ?;",
          {
             id:answer.empID
          },
          function (err, res) {
              if (err) throw err;

              console.log(" Employee deleted!");
              viewEmployees();

          })


  })

} 