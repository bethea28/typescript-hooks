// const { User } = require('./models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
// const { ApolloServer, gql } = require('apollo-server')

require('dotenv').config()

// console.log('webby', jsonwebtoken)
const { ApolloClient, InMemoryCache } = require('@apollo/client')
const {
  ApolloServer,
  gql,
  PubSub,
  withFilter,
} = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// const books = require('./data/books.json')
// const libraries = require('./data/libraries.json')
// const posts = require('./data/posts.json')
var Schemas = require('./server/models.js')

// const pubsub = new PubSub()
const app = express()
// const db = mongoose.connection
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

mongoose.connect(process.env.REACT_APP_NOT_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// let Book = mongoose.model('Book', Schemas.BookSchema)
let MadlibSchema = mongoose.model('Madlib', Schemas.MadlibSchema)
let UserSchema = mongoose.model('User', Schemas.UserSchema)

// console.log('madlib', MadlibSchema)

const typeDefs = gql`
  # type BookPayload {
  #   title: String
  #   author: String
  #   id: Int
  # }
  type User {
    id: Int
    username: String
    email: String
    password: String
  }

  type MadlibPayload {
    growUp: String
    favoriteFood: String
    loveTodDo: String
    messageMe: String
    band: String
    favoriteHole: String
    id: Int
  }

  type Query {
    # getAllBooks(id: Int): [BookPayload]
    getMadlibs(id: Int): [MadlibPayload]
    me: User
  }

  type Mutation {
    # createBook(title: String, author: String, id: Int): BookPayload
    createMadlib(
      growUp: String
      favoriteFood: String
      loveTodDo: String
      messageMe: String
      band: String
      favoriteHole: String
      id: Int
    ): MadlibPayload
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
  }
`
const resolvers = {
  Query: {
    getMadlibs: async (parent, args) => {
      // console.log('get mad libs', args)
      if (args.id) {
        let findAll = await MadlibSchema.find()
        // console.log('find one', findAll)
        return findAll.filter((a) => {
          return a.id === args.id
        })
      }
      return MadlibSchema.find()
    },
    async me(_, args, { user }) {
      // Make sure user is logged in
      console.log('query nigga', user)
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      // user is authenticated
      return await UserSchema.findById(user.id)
    },
    // getAllBooks: async (parent, args) => {
    //   if (args.id) {
    //     let findAll = await Book.find()
    //     console.log('find one', findAll)
    //     return findAll.filter((a) => {
    //       return a.id === args.id
    //     })
    //   }
    //   return Book.find()
    // },
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      console.log('sign up pass', password)
      const user = await UserSchema.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      })
      // Return json web token
      // return {
      //   username: 'good',
      // }
      // console.log('bryan got here', user)
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },
    async login(_, { email, password, id }) {
      console.log('logginin password', password)
      //findbyid is not working
      const user = await UserSchema.find({ email })
      // const user = await UserSchema.findOne({ where: { email } })
      console.log('logginin user', user)

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user[0].password)

      console.log('valid bryan', password)
      console.log('valid bryan user', user[0].password)
      console.log('laAR VALID', valid)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // Return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },
    createMadlib: (parents, args) => {
      // console.log('args madlib', args)
      MadlibSchema.create({
        growUp: args.growUp,
        favoriteFood: args.favoriteFood,
        loveTodDo: args.loveTodDo,
        messageMe: args.messageMe,
        band: args.band,
        favoriteHole: args.favoriteHole,
        id: args.id,
      })
      return {
        growUp: args.growUp,
        favoriteFood: args.favoriteFood,
        loveTodDo: args.loveTodDo,
        messageMe: args.messageMe,
        band: args.band,
        favoriteHole: args.favoriteHole,
        id: args.id,
      }
    },
    // createBook: (parents, args) => {
    //   console.log('args', args)
    //   Book.create({
    //     title: args.title,
    //     author: args.author,
    //     id: args.id,
    //   })
    //   return {
    //     title: args.title,
    //     author: args.author,
    //     id: args.id,
    //   }
    // },
  },
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  client,
  context: ({ req }) => {
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Koa, Lambda, etc.
    //
    // To find out the correct arguments for a specific integration,
    // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

    // Get the user token from the headers.
    // const token = req.headers.authorization || ''
    console.log('token bryan', req.headers)

    // Try to retrieve a user with the token
    // const user = getUser(token)

    // Add the user to the context
    // return { user }
  },
})

// await server.start()

server.applyMiddleware({ app })

// The `listen` method launches a web server.
app.listen({ port: 4000 }, async () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
