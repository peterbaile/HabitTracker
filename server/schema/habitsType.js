const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
const { GraphQLDateTime } = require('graphql-iso-date');

const recordType = new GraphQLObjectType({
    name: 'Records',
    fields: () => ({
        date: { type: GraphQLDateTime },
        times: { type: GraphQLInt },
    })
});

const habitType = new GraphQLObjectType({
    name: 'Habit',
    fields: () => ({
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        goalPeriod: { type: GraphQLString },
        target: { type: GraphQLInt },
        message: { type: GraphQLString },
        records: { type: new GraphQLList(recordType) }
    })
})

const habitsType = new GraphQLObjectType({
    name: 'Habits',
    fields: () => ({
        userId: { type: new GraphQLNonNull(GraphQLID) },
        habits: { type: new GraphQLList(habitType) }
    })
})

module.exports = habitsType;