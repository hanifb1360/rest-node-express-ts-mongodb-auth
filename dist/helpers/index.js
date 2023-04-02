"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
// A secret used to salt the authentication hash
const SECRET = 'HANIF-REST-API';
// Generate a random base64 string
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
// Generate an authentication hash using the salt and password
const authentication = (salt, password) => {
    return crypto_1.default
        .createHmac('sha256', [salt, password].join('/'))
        .update(SECRET)
        .digest('hex');
};
exports.authentication = authentication;
//# sourceMappingURL=index.js.map