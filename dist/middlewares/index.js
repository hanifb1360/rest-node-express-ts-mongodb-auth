"use strict";
// This middleware function checks whether a user is authenticated by verifying their session token.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isOwner = void 0;
const lodash_1 = require("lodash");
const users_1 = require("../db/users");
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, 'identity._id');
        if (!currentUserId) {
            return res.sendStatus(403);
        }
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
const isAuthenticated = async (req, // Express Request object
res, // Express Response object
next // Express NextFunction object
) => {
    try {
        // Get session token from cookie
        const sessionToken = req.cookies['HANIF-AUTH'];
        if (!sessionToken) {
            // If cookie is not present, send 403 Forbidden response
            return res.sendStatus(403);
        }
        // Get user object associated with session token
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            // If no user object is associated with the token, send 403 Forbidden response
            return res.sendStatus(403);
        }
        // Add the user object to the request object for downstream middleware and route handlers to access
        (0, lodash_1.merge)(req, { identity: existingUser });
        // Call the next middleware or route handler
        return next();
    }
    catch (error) {
        // If an error occurs during authentication, log the error and send 400 Bad Request response
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map