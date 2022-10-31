import * as express from "express";
import type { Application } from "express";
import { json, urlencoded } from "body-parser";
import * as mongoose from "mongoose";

const app: Application = express.default();
const port: Number = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use(urlencoded({extended: false}));
app.use(json());

var mongoDB = "mongodb://localhost/groops";
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