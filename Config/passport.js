let jwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let Users = require("../model/Users.model");

module.exports = function (passport) {
  let params = {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  passport.use(
    new jwtStrategy(params, async function (jwt_payload, next) {
      let emailID = jwt_payload.email;
      // console.log(jwt_payload);

      try {
        const user = await Users.findOne(
          { email: emailID },
          { _id: 0, email: 1, name: 1, role: 1 }
        );
        // console.log(user);
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      } catch (error) {
        return next(error, false);
      }
    })
  );
};
