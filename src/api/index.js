import request from './request.js';
import getUsersObjectivesQuery from './graphql/get-users-objectives.js';
import { SG_ENDPOINT_ME, SG_ENDPOINT_GRAPHQL } from '../constants.js';


export default cookie => {
    const { get, post } = request(cookie);
    return {
        getUserId: () => get(SG_ENDPOINT_ME).then(data => data.id),
        getUsersObjectives: userId => post(SG_ENDPOINT_GRAPHQL, {
            operationName: 'getUsersObjectives',
            query: getUsersObjectivesQuery,
            variables: { userId },
        }).then(({ data }) => data.user.objectives.edges.map(({ node }) => node)),
        checkin: () => {
            //  ...coming soon!
        },
    };
};
