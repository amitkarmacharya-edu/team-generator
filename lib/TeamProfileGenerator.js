const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const render = require("./htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const logo = require('asciiart-logo');
const config = require('../package.json');

class TeamProfileGenerator {
    constructor(questionList){
        this.empolyees = [];
        this.questions = questionList;
    }
         
    // start of the app
    launch(){
        // display the logo
        console.log(
            logo({
               name: 'Team Generator',
            // font: '3D-ASCII',
               font: 'ANSI Shadow',
               linechars: 100,
               padding: 2,
               margin: 3,
               borderColor: 'green',
               logoColor: 'bold-cyan',
               textColor: 'orange',
            })
            .emptyLine()
            .right('version: 1.0')
            .emptyLine()
            .center('Web Development Team')
            .render()
        );

        // ask initial questions
        this.askQuestions(this.questions.init, "init");

    }

    // ask questions
    askQuestions(questions,type) {

        inquirer.prompt(questions)
        .then(res => {

            if (type === "info") {
                this.addMembers(res);
                this.askQuestions(this.questions.init, "init");
            } else if (type === "continue") {
                
            } else if (type === 'init'){
                this.nextQuestions(res.role);
            } 

        })
        .catch(err => {
            console.log(err);
        });
    }

    nextQuestions(role){ 

            // new questions
            const newQuestions = [];

            if (role === "Manager") {
                this.questions.manager.map(q => {
                    console.log(q);
                    newQuestions.push(q)
                });
            } else if (role === "Engineer") {
                this.questions.engineer.map(q => newQuestions.push(q));
            } else if (role === "Intern") {
                this.questions.intern.map(q => newQuestions.push(q));
            } else if (role === "CREATE") {
                
                if (this.empolyees.length > 0){
                    console.log(this.empolyees);
                    this.render();
                    this.quit();
                } else {
                    console.log("NO TEAM MEMBERS WERE ADDED \n");
                    this.quit();
                }

            } else {
                this.quit();
            }


        // add questions common to all employees
        let employee = [...this.questions.employee];
        employee.reverse().map(q => newQuestions.unshift(q));

        // ask the questions
        this.askQuestions(newQuestions, "info");

    }

    // adds an employee
    addMembers(employee){
        
        let member;
        if (employee.employeeRole === "Manager") {
            member = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
        } else if(employee.employeeRole === "Engineer"){
            member = new Engineer(employee.name, employee.id, employee.email, employee.github);
        } else {
            member = new Intern(employee.name, employee.id, employee.email, employee.school);
        }

        this.empolyees.push(member);
        console.log("MEMBER ADDED");
    }

    // render the employees
    render(){ 
        const html = render(this.empolyees);
        fs.writeFileSync("index.html", html);
        console.log("TEAM HAS BEEN GENERATED");
    }

    // exit the program
    quit(){
        console.log("\nGoodbye!");
        process.exit(0);
    }

}

module.exports = TeamProfileGenerator;