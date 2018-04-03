import fetch from 'node-fetch';
import { getSGUrl, jsonifyResponse } from './utils.js';

//  Simplifies all the requests into either GET or POST
export default cookie => {
    const headers = {
        'Cookie': cookie, // eslint-disable-line quote-props
        'Content-Type': 'application/json',
        'User-Agent': '7geese-cli (+https://github.com/himynameisdave/7geese-cli)',
    };
    return {
        //  Wrapper for GET requests
        get: endpoint => fetch(getSGUrl(endpoint), {
            method: 'GET',
            headers,
        }).then(jsonifyResponse),
        //  Wrapper for POST requests
        post: (endpoint, body) => fetch(getSGUrl(endpoint), {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }).then(jsonifyResponse),
    };
};
