import {Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const SERVER_URL = process.env.SERVER_URL;
if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
}
const GITHUB_CLIENT_ID = process.env.MY_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.MY_GITHUB_CLIENT_SECRET;
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GIT_CLIENT_ID or GIT_CLIENT_SECRET");
}
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${SERVER_URL}/auth/google/callback`,
      scope: ["profile", "email"],
    },
    (_accessToken, _refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/auth/github/callback`,
      scope: ["user:email"],
    },
    (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
export default passport;
