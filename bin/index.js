"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 9000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/hello/:name', (req, res) => {
    res.send(`Hello there! ${req.params.name}`);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
function sum(num1, num2) {
    return num1 + num2;
}
console.log(sum(8, 4));
