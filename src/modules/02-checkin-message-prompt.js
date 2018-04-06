import { prompt } from 'inquirer';
import trim from 'trim';


export default () => prompt([{
    type: 'editor',
    name: 'message',
    message: 'How is this objective going?',
    filter: value => trim(value),
}]);
