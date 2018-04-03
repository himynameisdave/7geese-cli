import 'babel-polyfill';
import sevengeeseAPI from './api/index.js';
import getCookies from './modules/00-get-cookies.js';
import { reportProgress } from './utils/console-reporter.js';


(async function () {
    //  Display intro banner
    reportProgress();
    //  Grab 7G cookies, which includes the token
    const cookies = await getCookies();
    const api = sevengeeseAPI(cookies);
    //  Get the user's 7Geese id
    const userId = await api.getUserId();

    //  NEXT STEP: Get a list of the user's objectives


    console.log(userId);


}());
