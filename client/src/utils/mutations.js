import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
       username
       email
       bookCount
       savedBooks{
           authors
           description
           title
           bookId
           image
           link
       }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            description
            title
            bookId
            image
            link
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($profileId: ID!, $skill: String!) {
    saveBook(profileId: $profileId, skill: $skill) {
      _id
      username
      savedBooks{
          authors
          description
          title
          bookId
          image
          link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
        }
    }
}
`;