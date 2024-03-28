const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const GOOGLE_CLIENT_ID =
  Process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = Process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);


const handleAuthCallback = async (req, res) => {
  res.send({success : true, email : req.session.passport.user});
};

module.exports = {
  handleAuthCallback,
};
