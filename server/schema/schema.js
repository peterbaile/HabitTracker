const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    getGraphQLQueryArgs,
    getMongoDbQueryResolver,
    getGraphQLUpdateArgs,
    getMongoDbUpdateResolver
} = require('graphql-to-mongodb');
const {
    GraphQLString,
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
} = graphql;

const Users = require('../models/users');
const Habits = require('../models/habits');
const habitsType = require('./habitsType');

const userFields = {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
};

const usersInputType = new GraphQLObjectType({
    name: "UsersInput",
    fields: () => userFields
})

const usersReturnType = new GraphQLObjectType({
    name: "UsersReturn",
    fields: () => userFields
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(usersReturnType),
            args: getGraphQLQueryArgs(usersInputType),
            resolve: getMongoDbQueryResolver(usersInputType, async (filter, projection, options) => {
                if (filter.id) {
                    filter['_id'] = mongoose.Types.ObjectId(filter.id['$eq']);
                    delete filter.id;
                };
                const users = await Users.find(filter, null, options);
                console.log(users);
                return users;
            })
        },
        habits: {
            type: habitsType,
            args: getGraphQLQueryArgs(habitsType),
            resolve: getMongoDbQueryResolver(habitsType, async (filter, projection, options) => {
                return await Habits.find(filter, null, options);
            })
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: usersReturnType,
            args: getGraphQLUpdateArgs(usersInputType),
            resolve: getMongoDbUpdateResolver(usersInputType, async (filter, update) => {

                const user = update['$set'];

                if (!user.email || !user.password) {
                    throw new Error("Error: Your email or password is empty");
                }

                try {
                    return await Users.create(update['$set']);
                } catch (err) {
                    console.log(err);
                    throw new Error("Error occurs");
                }
            })
        },

        // support the function of adding a non-existing habit
        addHabit: {
            type: habitsType,
            args: getGraphQLUpdateArgs(habitsType),
            resolve: getMongoDbUpdateResolver(habitsType, async (filter, update) => {
                const userId = mongoose.Types.ObjectId(update['$set'].userId);
                const originalUserInfo = await Habits.findOne({ userId: userId });

                // If there is no habit for the user
                if (!originalUserInfo) {
                    return await Habits.create(update['$set']);
                }

                // If there is ≥1 habit for the user
                const originalHabits = originalUserInfo.habits;
                // originalHabits now become the newHabits
                originalHabits.push(update['$set'].habits[0]);
                await Habits.findOneAndUpdate({ userId: userId }, { habits: originalHabits });

                return await Habits.findOne({ userId: userId })

            })
        },

        // support the function of updating an existing habit
        updateHabit: {
            type: habitsType,
            args: getGraphQLUpdateArgs(habitsType),
            resolve: getMongoDbUpdateResolver(habitsType, async (filter, update) => {
                const userId = mongoose.Types.ObjectId(filter.userId['$eq']);
                const habitName = filter.habits['$elemMatch'].name['$eq'];
                console.log(habitName);
                console.log(userId);
                console.log(update['$set'].habits[0].name);
                const originalHabits = await Habits.findOne({ userId: userId });
                console.log("---Original Habits----");
                console.log(originalHabits.habits);

                console.log("---Objects quiried using filter directly----");
                const filterObject = await Habits.findOne(filter);
                console.log(filterObject);

                if (originalHabits.habits.length === 0) {
                    const obj = await Habits.findOne({ userId: userId });
                    console.log(obj);
                    await Habits.findOneAndUpdate({ userId: userId }, { habits: update['$set'].habits });
                }

                return Habits.findOne({ userId: userId })
            })
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})