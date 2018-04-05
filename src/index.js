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
    // const cookies = await getCookies();
    const api = sevengeeseAPI(cookies);
    const userId = await api.getUserId();

    reportProgress();
    const objectives = await api.getUsersObjectives(userId);
    const { selectedObjective } = await selectObjective(objectives);
    const { message } = await checkinMessagePrompt();

    reportProgress();
    const updatedKrValues = await updateKrsPrompt(selectedObjective.krs);
    const { assessmentStatus } = await assessmentStatusPrompt();
    const { shouldPost } = await confirmCheckinPrompt(message, updatedKrValues, assessmentStatus);


}());
