import {ApolloServer} from "apollo-server";

import typeDefs from "./schema/TypeDefs";
import resolvers from "./schema/Resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});