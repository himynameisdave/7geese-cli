import { prompt } from 'inquirer';
import { KR_TYPE } from '../constants.js';
import { reportProgress } from '../utils/console-reporter.js';
import calculatePercentageProgress from '../utils/calculate-progress-percentage.js';
import {
    isBinaryKr,
    isPercentageKr,
    isNumericKr,
    isMoneyKr,
} from '../utils/kr-types.js';


const getProgressPercentText = (kr, percentageProgress) => {
    if (!isBinaryKr(kr)) return `${percentageProgress}%`;
    return percentageProgress === 0 ? 'incomplete' : 'complete';
};
const getProgressWords = kr => {
    const percentageProgress = calculatePercentageProgress(kr.currentValue, kr.targetValue);
    return {
        percentageProgress,
        progressPercentText: getProgressPercentText(kr, percentageProgress),
        enterText: isBinaryKr(kr) ? `Is this KR ${percentageProgress === 100 ? 'still ' : ''}complete?` : 'Please enter the updated value for this KR:',
    };
};
const filterCompletedBinaryKrs = kr => !isBinaryKr(kr) ? true : kr.percentageProgress < 100;

const makeKrPrompt = kr => {
    const type = isBinaryKr(kr) ? 'confirm' : 'input';
    let progress = '';
    if (isBinaryKr(kr)) {
        progress = kr.progressPercentText;
    } else {
        progress = `at ${kr.currentValue}/${kr.targetValue} (${kr.progressPercentText})`;
    }
    return {
        type,
        name: kr.pk,
        message: `${kr.name}\nThis is KR is currently ${progress}.\n${kr.enterText}`,
        default: (isBinaryKr(kr) && kr.currentValue === 1) ? false : null,
        validate: value => {
            if (isBinaryKr(kr)) return true;
            const parsedValue = parseInt(value);
            if (isNaN(parsedValue)) {
                return 'Please enter a valid number for this KR';
            }
            //  Check that percentage measurementTypes actually are what they say
            if (isPercentageKr(kr) && parsedValue > 100) {
                return 'The maximum value for this KR is 100%';
            }
            return true;
        },
        filter: value => {
            if (isBinaryKr(kr)) return value;
            return parseInt(value);
        },
    };
};

export default krs => {
    const updatedKrs = krs.map(kr=> ({
        ...kr,
        ...getProgressWords(kr),
    }));
    return prompt(
        updatedKrs
            // .filter(filterCompletedBinaryKrs) // turning this off for the time being...
            .map(makeKrPrompt)
    ).then(updatedKrValues => updatedKrs.map(kr => {
        const updatedValue = updatedKrValues[`${kr.pk}`]; //  string coersion: It's because the keys are strings.
        return {
            ...kr,
            updatedValue,
            updatedPercentageProgress: calculatePercentageProgress(updatedValue, kr.targetValue),
        };
    }))
};
