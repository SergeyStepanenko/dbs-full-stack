import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Application, Request, Response, RequestHandler } from 'express'
import {
  Strategy,
  StrategyOptions,
  ExtractJwt,
  VerifiedCallback
} from 'passport-jwt'
import { User, getUserById, getUserByUsername, addUser } from './db/users'

interface JwtPayload {
  userId: string
}

const JWT_SECRET_KEY = 'PRIVATE_AUTH_KEY'

const TEST_ADMIN_USER: User = {
  username: 'admin',
  password: 'admin'
}

/** Options for JWT
 * in this exemple we use fromAuthHeader, so the client need to
 * provide an "Authorization" request header token
 */
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: JWT_SECRET_KEY,
  passReqToCallback: true
}

const jwtStategy = new Strategy(
  jwtOptions,
  (req: Request, jwtPayload: JwtPayload, done: VerifiedCallback) => {
    // In the login we encrypt the payload

    if (!jwtPayload.userId) {
      throw new Error('No userId in the JWT session token')
    }

    // const user = await getUser(username);

    getUserById(jwtPayload.userId)
      .then((user) => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
          // TODO: handle custom error to ask for create a new account
        }
      })
      .catch((err) => {
        return done(err, false)
      })
  }
)

/**
 * If added to a express route, it will make the route require the auth token
 */
export function verifyToken() {
  return passport.authenticate('jwt', { session: false })
}

/**
 * Setup the Passport JWT for the given express App.
 * It will add the auth routes (auth, login, logout) to handle the token authorization
 * It will use the mongoDB UserModel to check for user and password
 * Set addDebugRoutes to true for adding a Auth Form for testing purpose
 */
export function setupPassportAuth(app: Application) {
  passport.use(jwtStategy)

  app.use(passport.initialize())
}
