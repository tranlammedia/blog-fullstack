import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import { UserType } from "../interfaces";
import UserModel from "../models/User";
import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from "./constants";

const findOrCreateUser = {
    google: async (profile) => {
        const id_gg = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0]["value"];
        let user: UserType | null = await UserModel.findOne({ email });
        if (!user) {
            const newUser: UserType = new UserModel({ id_gg, name, email });
            await UserModel.create(newUser);
            user = newUser;
        }

        return user;
    },
    github:async (profile) => {
        
    }
};

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
            // https://github.com/jaredhanson/passport-google-oauth2/pull/51
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        async function (accessToken, refreshToken, profile, done) {
            
            const user = await findOrCreateUser.google(profile);
            return done(null, user);
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/github/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log("github");
            console.log(profile);
            // const user = await findOrCreateUser(profile)
            done(null, profile);
        }
    )
);

// Khởi tạo và duy trì phiên người dùng trong session
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { email: user.email, name: user.name, role: user.role });
    });
});

passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});

export default passport;
