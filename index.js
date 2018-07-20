const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const restaurants = [
  {
		id: 0,
    name: 'Mc Do',
  },
  {
		id: 1,
    name: 'Quick',
  },
];

const reviews = [
	{
		id: 0,
		restaurantId: 0,
		content: 'Bad!'
	},
	{
		id: 1,
		restaurantId: 1,
		content: 'Good!'
	},
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Restaurant {
		id: Int,
    name: String
  }

	type Review {
		id: Int,
		restaurantId: Int,
		content: String,
	}

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    restaurants: [Restaurant],
		reviews: [Review]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    restaurants: () => restaurants,
		reviews: () => reviews
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
