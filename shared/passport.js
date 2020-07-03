const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const dbAsync = require("../utils/dbAsync");
const config = require("config");

const jwtSecret = config.get("jwtSecret");

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
};

const jwtToken = async (payload, done) => {
  try {
    const { connection } = await dbAsync.getConnectionAsync();
    const user = await dbAsync.queryAsync(
      connection,
      `Select * from user where id=${payload.sub}`
    );
    
    if (user) return done(null, user[0]);
    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
};
exports.jwt = new JwtStrategy(jwtOptions, jwtToken);
