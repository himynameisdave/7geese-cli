export default `
    query getUsersObjectives($userId: Int!) {
        user: profile(pk: $userId) {
            objectives: ownedObjectives(first: 50, closed: false) {
                edges {
                    node {
                        name
                        krs: keyResults(first: 50) {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
