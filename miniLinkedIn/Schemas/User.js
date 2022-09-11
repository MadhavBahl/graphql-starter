const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        // By importing these inside this closure, we make sure that we do this lazily
        // If we call it outside, due to a circular dependency, it will always be undefined
        const { LocationType } = require('./Location');
        const { CompanyType } = require('./Company');
        return {
            id: { type: GraphQLID },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            description: { type: GraphQLString },
            location: {
                type: LocationType,
                resolve(parentValue, args) {
                    return axios
                        .get(
                            `http://localhost:3000/locations/${parentValue.locationId}`
                        )
                        .then((res) => res.data);
                },
            },
            company: {
                type: CompanyType,
                resolve(parentValue, args) {
                    return axios
                        .get(
                            `http://localhost:3000/companies/${parentValue.companyId}`
                        )
                        .then((res) => res.data);
                },
            },
        };
    },
});

module.exports = {
    UserType,
};
