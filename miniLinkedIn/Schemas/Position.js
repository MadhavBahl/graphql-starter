const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const { UserType } = require('./User');

const PositionType = new GraphQLObjectType({
    name: 'Position',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        employees: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios
                    .get(
                        `http://localhost:3000/positions/${parentValue.id}/users`
                    )
                    .then((res) => res.data);
            },
        },
    },
});

module.exports = {
    PositionType,
};
