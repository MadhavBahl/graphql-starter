const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
} = graphql;

const { UserType } = require('./User');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => {
        return {
            id: { type: GraphQLID },
            author: {
                type: UserType,
                resolve(currentObject, args) {
                    return axios
                        .get(
                            `http://localhost:3000/users/${currentObject.author}`
                        )
                        .then((res) => res.data);
                },
            },
            content: { type: GraphQLString },
            likedBy: {
                type: new GraphQLList(UserType),
                resolve(currentObject, args) {
                    const { likedBy } = currentObject;
                    const promises = likedBy.map((userId) => {
                        return axios
                            .get(`http://localhost:3000/users/${userId}`)
                            .then((res) => res.data);
                    });
                    return Promise.all(promises);
                },
            },
            comments: {
                type: new GraphQLList(PostType),
                resolve(currentObject, args) {
                    const { comments } = currentObject;
                    const promises = comments.map((postId) => {
                        return axios
                            .get(`http://localhost:3000/posts/${postId}`)
                            .then((res) => res.data);
                    });
                    return Promise.all(promises);
                },
            },
            isComment: { type: GraphQLBoolean },
        };
    },
});

module.exports = {
    PostType,
};
