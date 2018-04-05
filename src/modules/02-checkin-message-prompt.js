import { prompt } from 'inquirer';


export default () => prompt([{
    type: 'editor',
    name: 'message',
    message: 'How is this objective going?',
}]);
