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
    URL_SERVER,
} from "./constants";
import randomString from "../functions/randomString";

const findOrCreateUser = {
    google: async (profile) => {
        let existUser: UserType | null;
        const id_gg = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0]["value"];
        const role = "admin"
        existUser = await UserModel.findOne({ id_gg });
        if (existUser) {
            return { _id: existUser._id };
        }

        existUser = await UserModel.findOne({ email });
        if (existUser) {
            existUser = await UserModel.findByIdAndUpdate(
                existUser._id,
                { id_gg },
                { new: true }
                
            );
            return { _id: existUser?._id };
        }

        const newUser: UserType = new UserModel({ id_gg, name, email, role });
        existUser = await UserModel.create(newUser);

        return { _id: existUser._id };
    },
    github: async (profile) => {
        let existUser: UserType | null;
        let username = profile.username;
        const id_github = profile.id;
        const name = profile.displayName;
        const role = "author";
        

        existUser = await UserModel.findOne({ id_github });
    
        if (existUser) {
            return { _id: existUser._id };
        }
        
        existUser = await UserModel.findOne({ username });
        if (existUser) {
            username = `${username}-${randomString()}`
        }
        
        const newUser: UserType = new UserModel({ id_github, name, username, role });
        existUser = await UserModel.create(newUser);

        return { _id: existUser._id };
    },
};

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: URL_SERVER+"/api/auth/google/callback",
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
            callbackURL: URL_SERVER+"/api/auth/github/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            const user = await findOrCreateUser.github(profile);
            return done(null, user);
        }
    )
);

// Khởi tạo và duy trì phiên người dùng trong session
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, user);
    });
});

passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});

export default passport;
