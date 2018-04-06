import { prompt } from 'inquirer';
import { green, red, cyan, blue } from 'chalk';
import boxen from 'boxen';
import { ASSESSMENT_STATUS } from '../constants.js';
import { isBinaryKr } from '../utils/kr-types.js';


const getStatusText = status => {
    if (status === ASSESSMENT_STATUS.NONE) {
        return '';
    }
    if (status === ASSESSMENT_STATUS.ON_TRACK) {
        return green('👍 On Track');
    }
    if (status === ASSESSMENT_STATUS.OFF_TRACK) {
        return red('👎 Off Track');
    }
};

const getKrText = kr => {
    const isIncreasing = (kr.updatedValue - kr.currentValue) > 0;
    const name = blue(kr.name);
    if (isBinaryKr(kr)) {
        const emoji = `✅`;
        const status = kr.updatedValue ? green('complete') : red('incomplete');
        return `${emoji} ${name} (${status})`;
    }
    const emoji = isIncreasing ? `📈` : `📉`;
    const percentageChange = kr.updatedPercentageProgress - kr.percentageProgress;
    const percentageChangeText = isIncreasing
        ? green(`+${percentageChange}%`)
        : red(`${percentageChange}%`);
    return `${emoji} ${name} (${percentageChangeText})`;
};

export default (objective, message, updatedKrs, assessmentStatus) => {
    const boxenConfig = {
        borderStyle: 'round',
        padding: 1,
    };
    const preview = `
${cyan.underline(objective.name)}
${getStatusText(assessmentStatus)}
${updatedKrs.map(getKrText).join('\n')}
📝 "${message}"`;
    console.log(boxen(preview, boxenConfig)); // eslint-disable-line no-console

    return prompt([{
        type: 'confirm',
        name: 'shouldPostCheckin',
        message: '☝️ Does your check-in look correct?',
    }]);
};
