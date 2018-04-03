import banner from './banner.js';

const consoleReporter = function* () {
    const stage = {
        cookie: `🍪 Grabbing 7Geese token from browser cookies...`,
        id: `👤 Getting your user id from 7Geese...`,
        objectives: `🎯 Grabbing your open objectives...`,
        // construct: `📝 Constructing your check-in...`,
        // posting: `🚀 Posting your check-in...`,
    };
    yield banner;
    yield stage.cookie;
    yield stage.id;
    yield stage.objectives;
}

const reporter = consoleReporter();
export const reportProgress = () => console.log(reporter.next().value); // eslint-disable-line no-console
