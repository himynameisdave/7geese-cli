import 'babel-polyfill';
import sevengeeseAPI from './api/index.js';
import getCookies from './modules/00-get-cookies.js';
import getUserId from './modules/01-get-user-id.js';
import getUsersObjectives from './modules/02-get-users-objectives.js';
import selectObjective from './modules/03-select-objective.js';
import checkinMessagePrompt from './modules/04-checkin-message-prompt.js';
import updateKrsPrompt from './modules/05-update-krs-prompt.js';
import assessmentStatusPrompt from './modules/06-assessment-status-prompt.js';
import confirmCheckinPrompt from './modules/07-confirm-checkin-prompt.js';
import { reportProgress } from './utils/console-reporter.js';


(async function () {
    //  Display intro banner
    reportProgress();
    //  Grab 7G cookies, which includes the token
    //  TODO: try/catch to check if actually logged into 7Geese
    const cookies = await getCookies();
    const api = sevengeeseAPI(cookies);
    //  Get the user's 7Geese id
    const userId = await getUserId(api);
    const objectives = await getUsersObjectives(api)(userId);
    const { selectedObjective } = await selectObjective(objectives);
    const { message } = await checkinMessagePrompt();
    //  TODO: there needs to be a prompt before this like "AYY ...
    const updatedKrValues = await updateKrsPrompt(selectedObjective.krs);
    const { assessmentStatus } = await assessmentStatusPrompt();
    const { shouldPost } = await confirmCheckinPrompt(message, updatedKrValues, assessmentStatus);

    console.log(shouldPost);



}());
