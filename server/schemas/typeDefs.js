const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String!
    link: String!
    title: String!
  }

input BookInput {
  authors: [String]
  description: String
  bookId: String!
  image: String
  link: String!
  title: String!

}
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User

  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
