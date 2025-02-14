import pkg from 'passport-jwt'
import config from './config.js';
import { tokenTypes } from './tokens.js';
import { User, Driver, Manager } from '../models/index.js'

const { Strategy: JwtStrategy, ExtractJwt } = pkg;

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      throw new Error('Access token expired');
    }

    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }

    let user;
    if (payload.role === 'manager') {
      user = await Manager.findById(payload.sub);
    } else if (payload.role === 'driver') {
      user = await Driver.findById(payload.sub);
    } else if (payload.role === 'admin') {
      user = await User.findById(payload.sub);
    }

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    if (error.message === 'Access token expired') {
      return done(null, false, { message: 'Access token expired' });
    }
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export  {
  jwtStrategy,
};
