import banner from './banner.js';

const consoleReporter = function* () {
    const stage = {
        objectives: `🎯 Grabbing your open objectives...`,
        krs: `⛰ Now let's update your KRs for this objective...`,
        constructing: `📝 Constructing your check-in...`,
        posting: `🚀 Posting your check-in...`,
    };
    yield banner;
    yield stage.objectives;
    yield stage.krs;
    yield stage.constructing;
    yield stage.posting;
};

const reporter = consoleReporter();
export const reportProgress = () => console.log(reporter.next().value); // eslint-disable-line no-console
