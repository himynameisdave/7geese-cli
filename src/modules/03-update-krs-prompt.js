import { prompt } from 'inquirer';
import { KR_TYPE } from '../constants.js';
import { reportProgress } from '../utils/console-reporter.js';


const isBinaryKr = kr => kr.measurementType === KR_TYPE.BINARY;
const isPercentageKr = kr => kr.measurementType === KR_TYPE.PERCENTAGE;
const isNumericKr = kr => kr.measurementType === KR_TYPE.NUMERIC;
const isMoneyKr = kr => KR_TYPE.MONEY.includes(kr.measurementType);

//  TODO: break off into a utils module somewhere
const calculatePercentageProgress = kr => Math.round((kr.currentValue / kr.targetValue) * 100);
const getProgressPercentText = (kr, percentageProgress) => {
    if (!isBinaryKr(kr)) return `${percentageProgress}%`;
    return percentageProgress === 0 ? 'incomplete' : 'complete';
};
const getProgressWords = kr => {
    const percentageProgress = calculatePercentageProgress(kr);
    return {
        percentageProgress,
        progressPercentText: getProgressPercentText(kr, percentageProgress),
        enterText: isBinaryKr(kr) ? `Is this KR ${percentageProgress === 100 ? 'still ' : ''}complete?` : 'Please enter the updated value for this KR:',
    };
};
const filterCompletedBinaryKrs = kr => !isBinaryKr(kr) ? true : kr.percentageProgress < 100;

const makeKrPrompt = kr => {
    // console.log(kr);
    const type = isBinaryKr(kr) ? 'confirm' : 'input';
    let progress = '';
    if (isBinaryKr(kr)) {
        progress = kr.progressPercentText;
    } else {
        progress = `at ${kr.currentValue}/${kr.targetValue} (${kr.progressPercentText})`;
    }
    return {
        type,
        name: kr.name,
        message: `${kr.name}\nThis is KR is currently ${progress}.\n${kr.enterText}`,
        default: (isBinaryKr(kr) && kr.currentValue === 1) ? false : null,
        validate: value => {
            if (isBinaryKr(kr)) return true;
            const parsedValue = parseInt(parsedValue);
            //  Check that percentage measurementTypes actually are what they say
            if (isPercentageKr(kr) && parsedValue > 100) {
                return 'The maximum value for this KR is 100';
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
    //  TODO: flatten these elsewhere....
    const flattenedKrs = krs.edges.map(({ node }) => ({
        ...node,
        ...getProgressWords(node),
    })).filter(filterCompletedBinaryKrs);
    return prompt(flattenedKrs.map(makeKrPrompt));
};
