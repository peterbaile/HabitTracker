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

const userFields = {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})