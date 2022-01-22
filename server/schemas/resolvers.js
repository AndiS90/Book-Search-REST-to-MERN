const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');  // version key in regards to mongoose properties
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },





  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    saveBook: async (parent,  { bookInput } , context) => {
      console.log(bookInput)
      if(context.user ){        
        // const book = await Book.create({ input });
     
  const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks:  bookInput  } },
        {
          new: true,
          // runValidation: true,
        }
      );

      return updatedUser;
      
      }
    },
    //    // Set up mutation so a logged in user can only remove their profile and no one else's
    // deleteUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOneAndDelete({ _id: context.user._id });
    //     }
    //       throw new AuthenticationError('You need to be logged in!');
    //     },


      // Make it so a logged in user can only remove a book from their own profile
    deleteBook: async (parent, { bookId }, context) => {
          if (context.user) {

            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      }
    };
    

module.exports = resolvers;
