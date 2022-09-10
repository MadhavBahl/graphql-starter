const graphql = require('graphql');
const axios = require('axios');
const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLList } = graphql;

const { UserType } = require('./User');
const { LocationType } = require('./Location');

/**
 * Sample User data
 */
// const users = [
//     {
//         id: '12',
//         firstName: 'James',
//         lastName: 'Smith',
//         email: 'jamesSmith@testApp.com',
//         description: "I'm a test user",
//     },
// ];

// RootQuery is the entry point to the graph
const Root = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then((res) => {
                        return res.data;
                    });
                // return users.find((user) => user.id === args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/users').then((res) => {
                    return res.data;
                });
            },
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/locations/${args.id}`)
                    .then((res) => {
                        return res.data;
                    });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: Root,
});