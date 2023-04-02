"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
// Exporting a function that receives a 'router' object as parameter
exports.default = (router) => {
    // Defining a POST route for registering a new user, which invokes the 'register' function
    router.post('/auth/register', authentication_1.register);
    // Defining a POST route for logging in an existing user, which invokes the 'login' function
    router.post('/auth/login', authentication_1.login);
};
//# sourceMappingURL=authentication.js.map