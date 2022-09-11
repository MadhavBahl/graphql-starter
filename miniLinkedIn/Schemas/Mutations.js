const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const { UserType } = require('./User');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                locationId: { type: GraphQLNonNull(GraphQLID) },
                companyId: { type: GraphQLID },
                positionId: { type: GraphQLID },
            },
            resolve(
                currentObject,
                {
                    firstName,
                    lastName,
                    email,
                    description,
                    locationId,
                    companyId,
                    positionId,
                }
            ) {
                return axios
                    .post('http://localhost:3000/users', {
                        firstName,
                        lastName,
                        email,
                        description,
                        locationId,
                        companyId,
                        positionId,
                    })
                    .then((res) => res.data);
            },
        },
        modifyUser: {
            type: UserType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                description: { type: GraphQLString },
                locationId: { type: GraphQLID },
                companyId: { type: GraphQLID },
                positionId: { type: GraphQLID },
            },
            resolve(currentObject, args) {
                return axios
                    .patch(`http://localhost:3000/users/${args.id}`, args)
                    .then((res) => res.data);
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(currentObject, args) {
                return axios
                    .delete(`http://localhost:3000/users/${args.id}`)
                    .then((res) => res.data);
            },
        },
    },
});

module.exports = {
    Mutation,
};
