const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3001;
// const MONGO_URL = `mongodb://${dbName}:${dbPassword}@ds113765.mlab.com:13765/university`;
const MONGO_URL = `mongodb://localhost:27017/habitTracker`;

const schema = require('./schema/schema');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('./graphql');
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`----Listening to port ${PORT}----`);
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log("----Connected to database----"));