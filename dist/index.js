"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
// create an instance of express app
const app = (0, express_1.default)();
// enable cross-origin resource sharing with credentials
app.use((0, cors_1.default)({
    credentials: true,
}));
// use cookie-parser middleware
app.use((0, cookie_parser_1.default)());
// use compression middleware to compress responses
app.use((0, compression_1.default)());
// parse JSON-encoded request bodies using body-parser middleware
app.use(body_parser_1.default.json());
// create an HTTP server using the express app
const server = http_1.default.createServer(app);
// start listening on port 8080
server.listen(8080, () => {
    console.log('listening on port 8080');
});
// specify the MongoDB connection URL
const MONGO_URL = 'mongodb+srv://hanif:hanif@cluster0.hvptjbe.mongodb.net/?retryWrites=true&w=majority';
// set the mongoose Promise implementation to use native ES6 Promises
mongoose_1.default.Promise = Promise;
// connect to the MongoDB server
mongoose_1.default.connect(MONGO_URL);
// listen for errors on the MongoDB connection
mongoose_1.default.connection.on('error', (error) => console.log(error));
app.use('/', (0, router_1.default)());
//# sourceMappingURL=index.js.map