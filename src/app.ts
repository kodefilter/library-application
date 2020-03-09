import express from 'express'
import compression from 'compression'
import cors from 'cors'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import passport from 'passport'

import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

import bookRouter from './routers/books'
import authorRouter from './routers/authors'
import userRouter from './routers/users'

// for authentication related routes
import authRoutesRouter from './routers/authRoutes'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

// this is very important to put here in app.ts
const passportConfig = require('./config/passport')

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Express configuration
app.set('port', process.env.PORT || 3001)

// Use common 3rd-party middlewares
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())

app.use(session({
  secret: process.env['SESSION_SECRET'] as string,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000}
}))

// initialize passport and session of it
app.use(passport.initialize())
app.use(passport.session())

// Use book, author, user router
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)
app.use('/api/v1/users', userRouter)

app.use('/auth', authRoutesRouter)


// Custom API error handler
app.use(apiErrorHandler)

export default app
