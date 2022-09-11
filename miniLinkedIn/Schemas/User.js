const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        // By importing these inside this closure, we make sure that we do this lazily
        // If we call it outside, due to a circular dependency, it will always be undefined
        const { LocationType } = require('./Location');
        const { CompanyType } = require('./Company');
        const { PostType } = require('./Post');
        const { PositionType } = require('./Position');

        return {
            id: { type: GraphQLID },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
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
            company: {
                type: CompanyType,
                resolve(currentObject, args) {
                    return axios
                        .get(
                            `http://localhost:3000/companies/${currentObject.companyId}`
                        )
                        .then((res) => res.data);
                },
            },
            posts: {
                type: new GraphQLList(PostType),
                resolve(currentObject, args) {
                    const { posts } = currentObject;
                    const promises = posts.map((postId) => {
                        return axios
                            .get(`http://localhost:3000/posts/${postId}`)
                            .then((res) => res.data);
                    });
                    return Promise.all(promises);
                },
            },
            connections: {
                type: new GraphQLList(UserType),
                resolve(currentObject, args) {
                    const { connections } = currentObject;
                    const promises = connections.map((userId) => {
                        return axios
                            .get(`http://localhost:3000/users/${userId}`)
                            .then((res) => res.data);
                    });
                    return Promise.all(promises);
                },
            },
            position: {
                type: PositionType,
                resolve(currentObject, args) {
                    return axios
                        .get(
                            `http://localhost:3000/positions/${currentObject.positionId}`
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
