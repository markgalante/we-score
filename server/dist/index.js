"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const body_parser_1 = require("body-parser");
const mongoose = __importStar(require("mongoose"));
const routes_1 = require("./routes");
const app = express.default();
const port = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use((0, body_parser_1.json)());
app.use('/', routes_1.leagueRouter);
var mongoDB = "mongodb://localhost/groops";
mongoose
    .connect(mongoDB, () => {
    console.log("connected to database");
});
try {
    app.listen(port, () => {
        console.log(`🚀 Successfully connected to port: ${port}`);
    });
}
catch (error) {
    console.log(`Error occured: ${error}`);
}
;
//# sourceMappingURL=index.js.map