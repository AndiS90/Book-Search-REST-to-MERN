import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
       username
       email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook ($bookInput: BookInput!) {
  saveBook(bookInput: $bookInput) {
      _id
      username
      email
      bookCount
      savedBooks {
          bookId
          title
          authors
          description
          link
          image
      }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks{
          bookId
          authors
          description
          image
          link
          title
      }
  }
}
`;