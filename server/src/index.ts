import * as express from "express";
import type { Application } from "express";
import { json, urlencoded } from "body-parser";
import * as mongoose from "mongoose";

import {
    leagueRouter,
    teamRouter,
    matchRouter,
} from './routes'

const app: Application = express.default();
const port: Number = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use(urlencoded({extended: false}));
app.use(json());

app.use('/', leagueRouter);
app.use('/', teamRouter);
app.use('/', matchRouter);

var mongoDB = "mongodb://localhost/we-score";
mongoose
    .connect(mongoDB, (): void => {
    console.log("connected to database");
});

try {
    app.listen(port, (): void => {
        console.log(`🚀 Successfully connected to port: ${port}`);
    });
} catch (error) {
    console.log(`Error occured: ${error}`);
};