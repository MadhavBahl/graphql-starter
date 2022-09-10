const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        const { LocationType } = require('./Location');
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
        };
    },
});

module.exports = {
    UserType,
};
