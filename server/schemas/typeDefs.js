const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]!
    bookCount: Int
  }

  type Book {
    _id: ID
    authors: [String]
    description String
    bookId: String
    image: String
    link: String
    title: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(thoughtText: String!, thoughtAuthor: String!): User
    removeBook(thoughtId: ID!): User

  }
`;

module.exports = typeDefs;
