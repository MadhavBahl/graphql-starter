const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => {
        const { UserType } = require('./User');
        const { LocationType } = require('./Location');

        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
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
            users: {
                type: new GraphQLList(UserType),
                resolve(parentValue, args) {
                    return axios
                        .get(
                            `http://localhost:3000/companies/${parentValue.id}/users`
                        )
                        .then((res) => res.data);
                },
            },
        };
    },
});

module.exports = {
    CompanyType,
};
