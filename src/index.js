import 'babel-polyfill';
import sevengeeseAPI from './api/index.js';
import getCookies from './modules/00-get-cookies.js';
import getUserId from './modules/01-get-user-id.js';
import getUsersObjectives from './modules/02-get-users-objectives.js';
import selectObjective from './modules/03-select-objective.js';
import { reportProgress } from './utils/console-reporter.js';


(async function () {
    //  Display intro banner
    reportProgress();
    //  Grab 7G cookies, which includes the token
    //  TODO: try/catch to check if logged into 7Geese
    const cookies = await getCookies();
    const api = sevengeeseAPI(cookies);
    //  Get the user's 7Geese id
    const userId = await getUserId(api);
    const objectives = await getUsersObjectives(api)(userId);
    const { selectedObjective } = await selectObjective(objectives);


    console.log(selectedObjective);


}());
