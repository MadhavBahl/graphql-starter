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
                resolve(parentValue, args) {
                    return axios
                        .get(
                            `http://localhost:3000/users/${parentValue.author}`
                        )
                        .then((res) => res.data);
                },
            },
            content: { type: GraphQLString },
            likedBy: {
                type: new GraphQLList(UserType),
                resolve(parentValue, args) {
                    const { likedBy } = parentValue;
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
                resolve(parentValue, args) {
                    const { comments } = parentValue;
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
