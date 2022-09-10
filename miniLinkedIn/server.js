const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphQLScheam = require('./Schemas/Schema');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('<h1>Test</h1>');
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQLScheam,
        graphiql: true,
    })
);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
