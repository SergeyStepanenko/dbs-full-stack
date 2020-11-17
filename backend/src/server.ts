import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { printSchema } from 'graphql'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'

import graphQlSchema from './graphql/schema'
import { setupPassportAuth, verifyToken } from './authenticate'
import graphqlSchema from './graphql/schema'
import imageUpload from './rest/imageUpload'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors())

setupPassportAuth(app)

app.use(
  '/graphql',
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
app.post('/api/imageUpload', imageUpload)

async function start() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    app.listen(5000)

    console.log(
      `Connected to DB successfuly\nport: 5000\ngrapiQL: http://localhost:5000/graphql`
    )
  } catch (error) {
    console.log(error)
  }
}

start()
