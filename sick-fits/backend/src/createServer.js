const {GraphQLServer}   = require('graphql-yoga');
const Mutation          = require('./resolvers/Mutation');
const Query             = require('./resolvers/Query');
const db                = require('./db');

//Spin up a new GraphQL Yoga Server

function createServer(){
    return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: request => ({ ...request, db })
    })
}

module.exports = createServer;