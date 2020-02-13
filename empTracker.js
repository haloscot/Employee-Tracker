var mysql = require("mysql");
var inquirer=require("inquirer");

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
          message: "What would you like to do?",
          name : "userChoice",
          choices:["View all employees","View all departments","View all employee roles","Add an employee","Add a department","Add an employee role","Update employee details",]
      }]).then(firstCallback);


  }

  function firstCallback(answers){

    switch(answers) {
      case "View all employees":
        showEmployee();
        break;
      case "View all departments":
        viewDepartments();
        break;
      case "View all employee roles":
        viewRoles();
        break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a department":
          addDepartments();
          break;
        case "Add a new employee role":
          addRoles();
          break;
          case "Update employee details":
              updateEmployeeDetails();
              break;
      default:
        console.log("Choose an option");
    }
    
 // console.log(answers);
  }