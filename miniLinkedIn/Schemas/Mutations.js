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
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                description: { type: GraphQLString },
                locationId: { type: GraphQLID },
                companyId: { type: GraphQLID },
                positionId: { type: GraphQLID },
            },
            resolve(
                parentValue,
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
    },
});

module.exports = {
    Mutation,
};
