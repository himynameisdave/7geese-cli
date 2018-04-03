/**
 *  Attempt to retrieve the user's cookies from app.7geese.com/
 *  This should include a token that will be needed for all the requests
 */
import { getCookies } from 'chrome-cookies-secure';
import { SG_BASE_URL } from '../constants.js';


export default () => new Promise((res, rej) => {
    return getCookies(SG_BASE_URL, 'header', (err, cookies) => {
        if (err) {
            console.log('\nSomething went wrong!');
            return rej(err);
        }
        return res(cookies);
    });
});
