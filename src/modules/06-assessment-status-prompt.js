import { prompt } from 'inquirer';
import { ASSESSMENT_STATUS } from '../constants.js';


export default () => prompt([{
    type: 'list',
    name: 'assessment',
    message: 'What is the status of this objective?',
    choices: [
        {
            name: 'On Track',
            value: ASSESSMENT_STATUS.ON_TRACK,
        }, {
            name: 'Off Track',
            value: ASSESSMENT_STATUS.OFF_TRACK,
        }, {
            name: 'None',
            value: ASSESSMENT_STATUS.NONE,
        },
    ],
}]);
