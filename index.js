// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
  // NAME
  {
    type: 'input',
    name: 'name',
    message: 'What is your full name?',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your full name');
        return false;
      }
    }
  },
  // TITLE
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Please enter the title of your project');
        return false;
      }
    }
  },
  // DESCRIPTION
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project:',
    validate: descriptionInput => {
      if (descriptionInput) {
        return true;
      } else {
        console.log('Please provide a short description of your project');
        return false;
      }
    }
  },
  // INSTALLATION
  {
    type: 'input',
    name: 'installation',
    message: 'What are the steps required to install your project?',
    validate: installInput => {
      if (installInput) {
        return true;
      } else {
        console.log('Please provide a short description of how to install your project');
        return false;
      }
    }
  },
  // USAGE
  {
    type: 'input',
    name: 'instructions',
    message: 'Provide instructions and usage examples for your project:',
    validate: instructionsInput => {
      if (instructionsInput) {
        return true;
      } else {
        console.log('Please provide instructions and usage examples for your project');
        return false;
      }
    }
  },
  // LICENSE
  {
    type: 'confirm',
    name: 'confirmLicense',
    message: 'Would you like to include a license for your application?',
    default: false,
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your application',
    choices: ['MIT', 'GPL', 'BSD'],
    default: ['MIT'],
    when: ({confirmLicense}) => {
      if (confirmLicense) {
        return true;
      } else {
        return false;
      }
    }
  },
  // CONTRIBUTING
  {
    type: 'confirm',
    name: 'confirmContributions',
    message: 'Would you like other developers to contribute to this application?',
    default: false
  },
  {
    type: 'input',
    name: 'contributions',
    message: 'Write your contribution guidelines or press enter for the default (Default: Contributor Covenant)',
    default: '[Contributor Covenant](https://www.contributor-covenant.org/)',
    when: ({confirmContributions}) => {
      if (confirmContributions) {
        return true;
      } else {
        return false;
      }
    },
  },
  // TESTS
  {
    type: 'confirm',
    name: 'confirmTests',
    message: 'Are you including tests with your application?',
    default: false
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide examples of how to run tests for this application:',
    when: ({confirmTests}) => {
      if (confirmTests) {
        return true;
      } else {
        return false;
      }
    },
    validate: testsInput => {
      if (testsInput) {
        return true;
      } else {
        console.log('Please provide examples of how to run tests for this application');
        return false;
      }
    }
  },
  // QUESTIONS
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please provide your GitHub username');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
    validate: emailInput => {
      if (emailInput) {
        return true;
      } else {
        console.log('Please provide your email address');
        return false;
      }
    }
  },
];

// TODO: Create a function to write README file
function writeToFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/README.md', data, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'README.md created'
      });
    });
  });
};

// TODO: Create a function to initialize app
function init() {
  return inquirer.prompt(questions);
}

// Function call to initialize app
init()
  .then(markdownData => {
    return generateMarkdown(markdownData);
  })
  .then(markdown => {
    return writeToFile(markdown);
  })
  .catch(err => {
    console.log(err);
  });
