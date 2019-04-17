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
const usersType = require('./usersType');

const convertDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(usersType),
            args: getGraphQLQueryArgs(usersType),
            resolve: getMongoDbQueryResolver(usersType, async (filter, projection, options) => {
                if (filter.id) {
                    filter['_id'] = mongoose.Types.ObjectId(filter.id['$eq']);
                    delete filter.id;
                };
                const users = await Users.find(filter, null, options);
                return users;
            })
        },

        habits: {
            type: habitsType,
            args: getGraphQLQueryArgs(habitsType),
            resolve: getMongoDbQueryResolver(habitsType, async (filter, projection, options) => {
                const userId = mongoose.Types.ObjectId(filter.userId['$eq']);
                return await Habits.findOne({ userId: userId })
            })
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: usersType,
            args: getGraphQLUpdateArgs(usersType),
            resolve: getMongoDbUpdateResolver(usersType, async (filter, update) => {
                const user = update['$set'];

                if (!user.email || !user.password || !user.username) {
                    throw new Error("Error: Your email, password, or username is empty");
                }

                const users = await Users.findOne({ email: user.email });

                if (users) {
                    throw new Error("Found Duplicate Emails");
                }

                return await Users.create(update['$set']);
            })
        },

        updateUser: {
            type: usersType,
            args: getGraphQLUpdateArgs(usersType),
            resolve: getMongoDbUpdateResolver(usersType, async (filter, update) => {
                const id = mongoose.Types.ObjectId(filter.id['$eq']);
                await Users.findByIdAndUpdate(id, update['$set']);
                return Users.findById(id);
            })
        },

        // support the function of adding a non-existing habit
        addHabit: {
            type: habitsType,
            args: getGraphQLUpdateArgs(habitsType),
            resolve: getMongoDbUpdateResolver(habitsType, async (filter, update) => {
                const userId = mongoose.Types.ObjectId(filter.userId['$eq']);
                const originalUserInfo = await Habits.findOne({ userId: userId });

                // If there is no habit for the user
                if (!originalUserInfo) {
                    update['$set'].userId = userId;
                    return await Habits.create(update['$set']);
                }

                // If there is ≥1 habit for the user
                const originalHabits = originalUserInfo.habits;
                let newHabit = update['$set'].habits[0];
                newHabit.name = newHabit.name.toLowerCase();

                // check if there is a duplication of name for the newHabit
                const habitArray = originalHabits.filter(habit => habit.name === newHabit.name);
                if (habitArray.length !== 0) {
                    throw new Error("Error: Found duplicate habit name");
                }

                // originalHabits now become the newHabits
                originalHabits.push(newHabit);
                await Habits.findOneAndUpdate({ userId: userId }, { habits: originalHabits });

                return await Habits.findOne({ userId: userId });
            })
        },

        // support the function of updating an existing habit
        // times can be null
        updateHabit: {
            type: habitsType,
            args: getGraphQLUpdateArgs(habitsType),
            resolve: getMongoDbUpdateResolver(habitsType, async (filter, update) => {
                const updateSet = update['$set'].habits[0];
                const userId = mongoose.Types.ObjectId(filter.userId['$eq']);
                const habitName = filter.habits['$elemMatch'].name['$eq'];

                const originalUserInfo = await Habits.findOne({ userId: userId });

                const originalHabits = originalUserInfo.habits;

                // update originalHabits to newHabits
                originalHabits.map(habit => {
                    if (habit.name === habitName) {
                        for (x in updateSet) {
                            // check if the record in the updateSet actually contains value
                            if (x === 'records' && Object.keys(updateSet.records[0]).length !== 0) {
                                // habit.records is []
                                // check if the record at the same date already exists
                                const dateArray = habit.records.filter(record => {
                                    const existingDate = record.date;
                                    const updateDate = updateSet['records'][0].date;

                                    return convertDate(existingDate) === convertDate(updateDate);
                                });

                                if (dateArray.length === 0) {
                                    habit.records.push(updateSet['records'][0]);
                                } else {
                                    // record does not exist
                                    habit.records.map(record => {
                                        if (convertDate(record.date) === convertDate(updateSet['records'][0].date)) {
                                            record.times = updateSet['records'][0].times
                                        }
                                    })
                                }
                            } else if (x !== 'records'){
                                habit[x] = updateSet[x];
                            }
                        }
                    }
                })

                await Habits.findOneAndUpdate({ userId: userId }, { habits: originalHabits });

                return await Habits.findOne({ userId: userId })
            })
        },

        removeHabit: {
            type: habitsType,
            args: getGraphQLUpdateArgs(habitsType),
            resolve: getMongoDbUpdateResolver(habitsType, async (filter, update) => {
                const userId = mongoose.Types.ObjectId(filter.userId['$eq']);
                const habitName = filter.habits['$elemMatch'].name['$eq'];

                const originalUserInfo = await Habits.findOne({ userId: userId });

                const originalHabits = originalUserInfo.habits;

                const newHabits = originalHabits.filter(habit => habit.name !== habitName);

                await Habits.findOneAndUpdate({ userId: userId }, { habits: newHabits });

                return await Habits.findOne({ userId: userId })
            })
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})