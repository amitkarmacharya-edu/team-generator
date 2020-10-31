const Validate = require('./helper');

const questionList = {
    init: [
        [{
            type: 'list',
            name: 'menu',
            message: 'MAIN MENU\n',
            choices: ['CREATE A TEAM', 'EXIT']
        }],
        [{
            type: 'list',
            name: 'option',
            message: 'Add a member',
            choices: ['Manager', 'Engineer', 'Intern', 'CREATE TEAM', 'BACK']
        }]

    ],
    employee: [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the Employee?',
            validate: Validate.name
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the Employee?',
            validate: Validate.num
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the Employee?',
            validate: Validate.email
        }
       
    ],
    manager: [
        {
            type: 'list',
            name: 'role',
            message: "Select the role for the employee.",
            choices: ["Manager"]
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number for the manager?',
            validate: Validate.phoneNumber
        }
    ],
    engineer: [
        {
            type: 'list',
            name: 'role',
            message: "Select the role for the employee.",
            choices: ["Engineer"]
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the github user name of the employee?',
            validate: Validate.github
        }
    ],
    intern: [
        {
            type: 'list',
            name: 'role',
            message: "Select the role for the employee.",
            choices: ["Intern"]
        },
        {
            type: 'input',
            name: 'school',
            message: 'Which school is the intern from?',
            validate: Validate.name
        }
    ]

}

module.exports = questionList;