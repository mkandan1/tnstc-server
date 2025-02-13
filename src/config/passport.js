const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User, Driver, Manager } = require('../models');

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

module.exports = {
  jwtStrategy,
};
