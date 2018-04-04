import banner from './banner.js';

const consoleReporter = function* () {
    const stage = {
        cookie: `🍪 Grabbing 7Geese token from browser cookies...`,
        id: `👤 Getting your user id from 7Geese...`,
        objectives: `🎯 Grabbing your open objectives...`,
        krs: `⛰ Okay cool! Let's update your KRs for this objective...`,
        // constructing: `📝 Constructing your check-in...`,
        // posting: `🚀 Posting your check-in...`,
    };
    yield banner;
    yield stage.cookie;
    yield stage.id;
    yield stage.objectives;
    yield stage.krs;
}

const reporter = consoleReporter();
export const reportProgress = () => console.log(reporter.next().value); // eslint-disable-line no-console
