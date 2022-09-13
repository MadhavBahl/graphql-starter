const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean,
} = graphql;
const { UserType } = require('./User');
const { CompanyType } = require('./Company');
const { LocationType } = require('./Location');
const { PositionType } = require('./Position');
const { PostType } = require('./Post');

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
        addCompany: {
            type: CompanyType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                locationId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(currentObject, { name, description, locationId }) {
                return axios
                    .post('http://localhost:3000/companies', {
                        name,
                        description,
                        locationId,
                    })
                    .then((res) => res.data);
            },
        },
        modifyCompany: {
            type: CompanyType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                locationId: { type: GraphQLID },
            },
            resolve(currentObject, args) {
                return axios
                    .patch(`http://localhost:3000/companies/${args.id}`, args)
                    .then((res) => res.data);
            },
        },
        deleteCompany: {
            type: CompanyType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(currentObject, args) {
                return axios
                    .delete(`http://localhost:3000/companies/${args.id}`)
                    .then((res) => res.data);
            },
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(currentObject, { name }) {
                return axios
                    .post('http://localhost:3000/locations', { name })
                    .then((res) => res.data);
            },
        },
        modifyLocation: {
            type: LocationType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
            },
            resolve(currentObject, args) {
                return axios
                    .patch(`http://localhost:3000/locations/${args.id}`, args)
                    .then((res) => res.data);
            },
        },
        deleteLocation: {
            type: LocationType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(currentObject, args) {
                return axios
                    .delete(`http://localhost:3000/locations/${args.id}`)
                    .then((res) => res.data);
            },
        },
        addPosition: {
            type: PositionType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(currentObject, { title }) {
                return axios
                    .post('http://localhost:3000/positions', { title })
                    .then((res) => res.data);
            },
        },
        modifyPosition: {
            type: PositionType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
            },
            resolve(currentObject, args) {
                return axios
                    .patch(`http://localhost:3000/positions/${args.id}`, args)
                    .then((res) => res.data);
            },
        },
        deletePosition: {
            type: PositionType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(currentObject, args) {
                return axios
                    .delete(`http://localhost:3000/positions/${args.id}`)
                    .then((res) => res.data);
            },
        },
        addPost: {
            type: PostType,
            args: {
                author: { type: GraphQLNonNull(GraphQLID) },
                content: { type: GraphQLNonNull(GraphQLString) },
                parentPost: { type: GraphQLID },
                isComment: { type: GraphQLBoolean },
            },
            resolve(currentObject, { author, content, parentPost, isComment }) {
                return axios
                    .post('http://localhost:3000/posts', {
                        author,
                        content,
                        parentPost,
                        isComment,
                    })
                    .then((res) => {
                        if (isComment) {
                            // if it's a comment, parentPost must be modified
                            axios
                                .get(
                                    `http://localhost:3000/posts/${parentPost}`
                                )
                                .then((resp) => {
                                    const { comments } = resp.data;
                                    return axios
                                        .patch(
                                            `http://localhost:3000/posts/${parentPost}`,
                                            {
                                                comments: [
                                                    ...comments,
                                                    res.data.id,
                                                ],
                                            }
                                        )
                                        .then((r) => r.data);
                                });
                        }

                        return res.data;
                    });
            },
        },
    },
});

module.exports = {
    Mutation,
};
