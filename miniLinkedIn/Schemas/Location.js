const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const { UserType } = require('./User');

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(currentObject, args) {
                // Here, currentObject is the location object
                // Which means, currentObject will have the id of the location
                // We can use that id to get the users for that location
                return axios
                    .get(
                        `http://localhost:3000/locations/${currentObject.id}/users/`
                    )
                    .then((res) => res.data);
            },
        },
    },
});

module.exports = {
    LocationType,
};
