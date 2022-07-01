import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import { option } from './db';
import userRouter from './router/userRouter';

const MySQLStore = require('express-mysql-session')(session)
const sessionStore = new MySQLStore(option)
const app = express();
const logger = morgan("dev");
app.use(logger);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(cors(
    { origin: 'http://localhost:3000', credentials: 'true' }
));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60,
            // sameSite: "lax",
            // secure: true,
        },
    })
)

app.use("/api/", userRouter);

export default app
