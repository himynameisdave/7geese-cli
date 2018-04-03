import { SG_ENDPOINT_ME } from '../constants.js';
import request from './request.js';


export default cookie => {
    const { get, post } = request(cookie);
    return {
        getUserId: () => get(SG_ENDPOINT_ME).then(data => data.id),
        getUsersObjectives: () => {
            //  ...coming soon!
        },
        checkin: () => {
            //  ...coming soon!
        },
    };
};
