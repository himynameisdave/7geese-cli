//  This can be broken off:
const banner = `
███████╗ ██████╗ ███████╗███████╗███████╗███████╗
╚════██║██╔════╝ ██╔════╝██╔════╝██╔════╝██╔════╝
    ██╔╝██║  ███╗█████╗  █████╗  ███████╗█████╗
   ██╔╝ ██║   ██║██╔══╝  ██╔══╝  ╚════██║██╔══╝
   ██║  ╚██████╔╝███████╗███████╗███████║███████╗
   ╚═╝   ╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝

                Welcome to 7Geese!
        Let's check into your objectives!
`;


const consoleReporter = function* () {
    const stage = {
        banner,
        cookie: `🍪 Grabbing 7Geese token from browser cookies...`,
        id: `👤 Getting your user id from 7Geese...`,
        // comments: `🗣️ Tell me about your progress bro...`,
        // construct: `📝 Constructing your check-in...`,
        // posting: `🚀 Posting your check-in...`,
    };
    yield stage.banner;
    yield stage.cookie;
    yield stage.id;
}

const reporter = consoleReporter();
export const reportProgress = () => console.log(reporter.next().value); // eslint-disable-line no-console
