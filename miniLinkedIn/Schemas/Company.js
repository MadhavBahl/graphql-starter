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
                resolve(currentObject, args) {
                    return axios
                        .get(
                            `http://localhost:3000/locations/${currentObject.locationId}`
                        )
                        .then((res) => res.data);
                },
            },
            users: {
                type: new GraphQLList(UserType),
                resolve(currentObject, args) {
                    return axios
                        .get(
                            `http://localhost:3000/companies/${currentObject.id}/users`
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
