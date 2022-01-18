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

export const LOGIN_USER = gql`
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
  mutation saveBook( $authors: [String]!, $description: String!, $bookId: String!, $image: String!, $title: String!, $link: String!) {
    saveBook( authors: $authors, description: $description, bookId: $bookID, image: $image,title: $title, link: $link ) {
        _id
        authors
        description       
        bookId
        image 
        title
        link
      }
    }
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
    deleteBook(_id: $bookId) {
        _id
        bookId
        authors
        image
        description
        title
        link
        }
    }
`;