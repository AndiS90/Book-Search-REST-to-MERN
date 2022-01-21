import { gql } from '@apollo/client';

export const QUERY_ME = gql`
 query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            authors
            description
            bookId
            image
            title
            link
      }      
    }
  }
  `;

//   export const QUERY_BOOKS = gql`
//   query getBooks {
//     books {
//       _id
//       authors
//       description
//       bookId
//       image
//       title
//       link
//     }
//   }
// `;