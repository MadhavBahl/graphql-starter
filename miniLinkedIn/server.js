const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('<h1>This is our graphQL app</h1>');
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
