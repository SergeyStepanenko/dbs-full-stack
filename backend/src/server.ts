import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { printSchema } from 'graphql'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

import graphQlSchema from './graphql/schema'
import { setupPassportAuth, verifyToken } from './authenticate'
import graphqlSchema from './graphql/schema'
import imageUpload from './rest/imageUpload'
;(mongoose as any).Promise = global.Promise

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

setupPassportAuth(app)

app.use(
  '/graphql',
  cors(),
  graphqlHttp({
    schema: graphQlSchema,
    graphiql: true
  })
)

app.use(express.static('./public'))

app.use('/schema', verifyToken(), (req, res, _next) => {
  res.set('Content-Type', 'text/plain')
  res.send(printSchema(graphqlSchema))
})

app.use(fileUpload({ createParentPath: true }))
app.post('/imageUpload', imageUpload)

async function start() {
  try {
    await mongoose.connect('mongodb://mongo:27017/dbs-project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(5000)

    console.log(
      `Connected to DB successfuly\nport: 5000\ngrapiQL: http://localhost:5000/graphql`
    )
  } catch (error) {
    console.log(`Error connection to DB: ${error}`)
  }
}

start()
