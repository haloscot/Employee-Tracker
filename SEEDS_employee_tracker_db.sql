USE employee_tracker_db;

INSERT INTO department (dep_name)
VALUES ("legal"), ("accounting"), ("marketing"), ("it");

INSERT INTO emp_role(title,salary, department_id)
VALUES ("lawyer",125000,1),("cpa",90000,2),("lead",80000,3),("developer",100000,4);

INSERT INTO employee(firstName, lastName,role_id)
 VALUES ("josh","hamm",5),("brian","robles",6),("heidi","lear",8),("sarah","armstrong",7);