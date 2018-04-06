export default `
    query getUsersObjectives($userId: Int!) {
        user: profile(pk: $userId) {
            objectives: ownedObjectives(first: 50, closed: false) {
                edges {
                    node {
                        url
                        name
                        krs: keyResults(first: 50) {
                            edges {
                                node {
                                    pk
                                    url
                                    name
                                    targetValue
                                    currentValue
                                    measurementType
                                    startingValue
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
