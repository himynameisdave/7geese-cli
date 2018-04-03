/**
 *  We'll need the user's ID to make some of our requests
 */
import { reportProgress } from '../utils/console-reporter.js';

export default api => {
    reportProgress();
    return api.getUserId();
};
