require('dotenv').config()

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
const db = mongoose.connection
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

mongoose.connect(process.env.REACT_APP_NOT_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// let Book = mongoose.model('Book', Schemas.BookSchema)
let MadlibSchema = mongoose.model('Madlib', Schemas.MadlibSchema)

console.log('madlib', MadlibSchema)

const typeDefs = gql`
  # type BookPayload {
  #   title: String
  #   author: String
  #   id: Int
  # }

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
  }
`
const resolvers = {
  Query: {
    getMadlibs: async (parent, args) => {
      console.log('get mad libs', args)
      if (args.id) {
        let findAll = await MadlibSchema.find()
        console.log('find one', findAll)
        return findAll.filter((a) => {
          return a.id === args.id
        })
      }
      return MadlibSchema.find()
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
    createMadlib: (parents, args) => {
      console.log('args madlib', args)
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
})

server.start()

server.applyMiddleware({ app })

// The `listen` method launches a web server.
app.listen({ port: 4000 }, async () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
