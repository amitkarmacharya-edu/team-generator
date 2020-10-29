const questionList = {
    init: [
        {
            type: 'list',
            name: 'role',
            message: 'who do you want to add to the team?',
            choices: ["Manager", "Engineer", "Intern", "CREATE", "EXIT"]
        }
    ],
    employee: [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the Employee?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the Employee?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the Employee?'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "Select the role for the employee.",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ],
    manager: [
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office Number for the manager?'
        }
    ],
    engineer: [
        {
            type: 'input',
            name: 'github',
            message: 'What is the github user name of the employee?'
        }
    ],
    intern: [
        {
            type: 'input',
            name: 'school',
            message: 'Which school is the intern from?'
        }
    ]

};

module.exports = questionList;