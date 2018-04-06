import { prompt } from 'inquirer';
import { SG_BASE_URL } from '../constants.js';

export default objectives => prompt([{
    type: 'list',
    name: 'selectedObjective',
    message: 'Which of your objectives would you like to check-in to?',
    choices: objectives.map(({ name }) => name),
    filter: selected => {
        const objective = objectives.find(({ name }) => selected === name);
        return {
            ...objective,
            openUrl: `${SG_BASE_URL}/objective/${objective.pk}`,
            krs: objective.krs.edges.map(({ node }) => ({ ...node })),
        };
    },
}]);
