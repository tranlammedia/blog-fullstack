import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";

import connectDatabase from "./config/database";
import passport from "./config/passport";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import authenticateToken from "./middlewares/authenticateToken";
import authenticateAdmin from "./middlewares/authenticateAdmin";
import { PORT, SECRET_SESSION_KEY, URL_DATABASE } from "./config/constants";

interface ExtendedRequest extends Request {
    user?: any;
    isAuthenticated?: () => boolean;
}
const app = express();

connectDatabase(URL_DATABASE);

app.use(
    cors({
        origin: "http://127.0.0.1:3000", // Replace with your actual client origin
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        exposedHeaders: "Authorization", // sent token to client
        optionsSuccessStatus: 204,
    })
);
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));

// Sử dụng session để theo dõi trạng thái đăng nhập
app.use(
    session({
        secret: SECRET_SESSION_KEY,
        resave: false, // false ony save when change
        saveUninitialized: false, // false, not create new when don't just actiom
    })
);

// Khởi tạo Passport và sử dụng session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// authorization
app.get(
    "/api/auth",
    authenticateToken,
    authenticateAdmin,
    async (req: ExtendedRequest, res: Response) => {
        console.log(req.user);
        return res.sendStatus(200);
    }
);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
