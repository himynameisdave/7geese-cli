import { prompt } from 'inquirer';


export default (message, updatedKrs, assessmentStatus) => {
    console.log(message);
    console.log(updatedKrs);
    console.log(assessmentStatus);

    return prompt([{
        type: 'confirm',
        name: 'shouldPost',
        message: '☝️ Does your check-in look correct?',
    }]);
};
