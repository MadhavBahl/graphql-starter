const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('<h1>Test</h1>');
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
