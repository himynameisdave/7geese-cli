/**
 *  Grab all open objectives that the user owns
 */
import { reportProgress } from '../utils/console-reporter.js';

export default api => userId => {
    reportProgress();
    return api.getUsersObjectives(userId);
};
