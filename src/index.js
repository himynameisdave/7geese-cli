import 'babel-polyfill';
import sevengeeseAPI from './api/index.js';
import getCookies from './modules/00-get-cookies.js';
import selectObjective from './modules/01-select-objective.js';
import checkinMessagePrompt from './modules/02-checkin-message-prompt.js';
import updateKrsPrompt from './modules/03-update-krs-prompt.js';
import assessmentStatusPrompt from './modules/04-assessment-status-prompt.js';
import confirmCheckinPrompt from './modules/05-confirm-checkin-prompt.js';
import { reportProgress } from './utils/console-reporter.js';


(async function () {
    //  Display intro banner
    reportProgress();

    //  TODO: try/catch to check if actually logged into 7Geese
    const cookies = await getCookies();
    const api = sevengeeseAPI(cookies);
    const userId = await api.getUserId();

    reportProgress();
    const objectives = await api.getUsersObjectives(userId);
    const { selectedObjective } = await selectObjective(objectives);
    const { message } = await checkinMessagePrompt();

    reportProgress();
    const updatedKrValues = await updateKrsPrompt(selectedObjective.krs);
    const krs = selectedObjective.krs.map(kr => ({
        ...kr,
        currentValue: updatedKrValues[`${kr.pk}`], //  string coersion: It's because the keys are strings.
    }));
    const { assessmentStatus } = await assessmentStatusPrompt();

    reportProgress();
    const { shouldPostCheckin } = await confirmCheckinPrompt(message, krs, assessmentStatus);

    if (shouldPostCheckin) {
        reportProgress();
        const postResponse = await api.checkin({
            objective: selectedObjective.url,
            message,
            assessment_status: assessmentStatus,
            key_results: krs.map(({ pk, name, url, ...kr }) => ({
                id: pk,
                name,
                url: url,
                key_result: url,
                current_value: kr.currentValue,
                starting_value: kr.startingValue,
                target_value: kr.targetValue,
                measurement_type: kr.measurementType,
            })),
            //  TODO: later we should prompt for if they are trying to close the objective
            close_objective: false,
            final_assessment: false,
        });
        console.log(postResponse);
    }

}());
