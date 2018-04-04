
// export const SG_BASE_URL = 'http://localhost:8000';
//  For prod, use this one
export const SG_BASE_URL = 'https://app.7geese.com';


export const SG_ENDPOINT_ME = '/api/v/2.0/userprofiles/me/';
export const SG_ENDPOINT_GRAPHQL = '/graphql';

export const KR_TYPE = {
    PERCENTAGE: 1,
    NUMERIC: 3,
    BINARY: 7,
    MONEY: [
        2,  // dollar
        4,  // euro
        5,  // yen
        6,  // pound sterling
        8,  // reals
        9,  // yuan
        10, // krona
        11, // rupee
        12, // krone
        13, // philippine peso
        14, // mexican peso
        15, // turkish lira
        16, // rand
        17, // dinar
        18, // new shekel
        19, // rupiah
        20, // columbian peso
    ],
};
