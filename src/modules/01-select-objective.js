import { prompt } from 'inquirer';


export default objectives => prompt([{
    type: 'list',
    name: 'selectedObjective',
    message: 'Which of your objectives would you like to check-in to?',
    choices: objectives.map(({ name }) => name),
    filter: selected => {
        const objective = objectives.find(({ name }) => selected === name);
        return {
            ...objective,
            krs: objective.krs.edges.map(({ node }) => ({ ...node })),
        };
    },
}]);
