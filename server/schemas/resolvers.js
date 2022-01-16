const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // users: async () => {
    //   return User.find().populate('books');
    // },
    // user: async (parent, { userID }) => {
    //   return User.findOne({ userID }).populate('books');
    // },
    // books: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Book.find(params).sort({ createdAt: -1 });
    // },
    // book: async (parent, { bookId }) => {
    //   return Book.findOne({ _id: bookId });
    // },
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },





  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
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
    addBook: async (parent, { authors, description, bookId, image, link, title }, context) => {
      const book = await Book.create({ authors, description, bookId, image, link, title });

      if(context.user){
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { books: book } },
        {
          new: true,
          runValidators: true,
        }
      )
      }
    },
       // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
        }
          throw new AuthenticationError('You need to be logged in!');
        },


      // Make it so a logged in user can only remove a book from their own profile
    removeBook: async (parent, { bookStuff }, context) => {
          if (context.user) {
            return User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { books: bookStuff } },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      }
    };
    

module.exports = resolvers;
