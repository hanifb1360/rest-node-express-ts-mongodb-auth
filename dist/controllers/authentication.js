"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../db/users"); // Importing functions to interact with the users database
const helpers_1 = require("../helpers"); // Importing helper functions for authentication and random string generation
// Request handler for user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extracting email and password from the request body
        if (!email || !password) {
            // If email or password is missing, send a Bad Request response
            return res.sendStatus(400);
        }
        // Getting the user from the database by email and selecting their salt and hashed password
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            // If user doesn't exist, send a Bad Request response
            return res.sendStatus(400);
        }
        // Hashing the password provided by the user using the salt value retrieved from the database
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        // If the hashed password doesn't match the one stored in the database, send a Forbidden response
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        // Generating a new session token for the user and saving it to the database
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        // Setting the session token as a cookie and sending the user object as JSON response with 200 status code
        res.cookie('HANIF-AUTH', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error); // Logging any error that occurred during the process
        return res.sendStatus(400); // Sending a Bad Request response with 400 status code in case of any error
    }
};
exports.login = login;
// Request handler for user registration
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body; // Extracting email, password, and username from the request body
        // If any of the required fields are missing, send a Bad Request response
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        // Checking if a user with the given email already exists in the database
        const existingUser = await (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            // If the user already exists, send a Bad Request response
            return res.sendStatus(400);
        }
        // Generating a random salt value, hashing the password using the salt, and creating a new user object
        const salt = (0, helpers_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        // Sending the newly created user object as JSON response with 200 status code
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error); // Logging any error that occurred during the process
        return res.sendStatus(400); // Sending a Bad Request response with 400 status code in case of any error
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map