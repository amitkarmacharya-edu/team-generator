const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const render = require("./htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const logo = require('asciiart-logo');

const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

class TeamProfileGenerator {

    constructor(questionList){

        this.empolyees = [];
        this.questions = questionList;

    }
         
    // start of the app
    launch() {
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

        console.log("Create a Team \n")
        // ask initial questions
        this.askQuestions(this.questions.init[0][0]);

    }

    // ask questions
    askQuestions(questions) {
        inquirer.prompt(questions)
        .then(res => {

            // if question is from main menu
            if(res.menu){

                if(res.menu === "CREATE A TEAM"){
                    this.askQuestions(this.questions.init[1][0]);
                } else {
                    this.quit();
                }

            // when user selects employee type, create questions of
            // the corresponding type
            } else if (res.option) {

                if(res.option === "CREATE TEAM"){
                    this.render();
                } else if (res.option === "BACK") {
                    this.askQuestions(this.questions.init[0][0]);
                } else {
                    this.nextQuestions(res.option);
                }

            // add the member
            } else {

                this.addMembers(res);
                this.askQuestions(this.questions.init[1][0])

            }

        })
        .catch(err => {
            console.log(err);
        });
    }

    nextQuestions(role) { 

            // new questions
            const newQuestions = [];

            if (role === "Manager") {
                this.questions.manager.map(q => newQuestions.push(q));
            } else if (role === "Engineer") {
                this.questions.engineer.map(q => newQuestions.push(q));
            } else {
                this.questions.intern.map(q => newQuestions.push(q));
            } 
                
                
        // add questions common to all employees
        let employee = [...this.questions.employee];
        employee.reverse().map(q => newQuestions.unshift(q));

        // ask the questions
        this.askQuestions(newQuestions);

    }

    // adds an employee
    addMembers(employee) {
        
        let member;
        if (employee.role === "Manager") {
            member = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
        } else if(employee.role === "Engineer"){
            member = new Engineer(employee.name, employee.id, employee.email, employee.github);
        } else {
            member = new Intern(employee.name, employee.id, employee.email, employee.school);
        }

        this.empolyees.push(member);
        console.log("\x1b[32m","\nMEMBER ADDED SUCCESSFULLY\n");
    }

    // render the employees
    render() { 

        if (this.empolyees.length > 0){

            const html = render(this.empolyees);

            // checks if the output folder exists already
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
            }

            fs.writeFileSync(outputPath, html);
            console.log("\x1b[32m","TEAM HAS BEEN GENERATED, CHECK THE output folder");

        } else {

            console.log("\x1b[31m","\nNO TEAM MEMBERS WERE ADDED TO CREATE A TEAM \n");
            
        }

        this.quit();
    }

    // exit the program
    quit(){
        console.log("\nGoodbye!");
        process.exit(0);
    }

}

module.exports = TeamProfileGenerator;  