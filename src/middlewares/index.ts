// This middleware function checks whether a user is authenticated by verifying their session token.

import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
export const isAuthenticated = async (
  req: express.Request, // Express Request object
  res: express.Response, // Express Response object
  next: express.NextFunction // Express NextFunction object
) => {
  try {
    // Get session token from cookie
    const sessionToken = req.cookies['HANIF-AUTH'];
    if (!sessionToken) {
      // If cookie is not present, send 403 Forbidden response
      return res.sendStatus(403);
    }

    // Get user object associated with session token
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      // If no user object is associated with the token, send 403 Forbidden response
      return res.sendStatus(403);
    }

    // Add the user object to the request object for downstream middleware and route handlers to access
    merge(req, { identity: existingUser });
    // Call the next middleware or route handler
    return next();
  } catch (error) {
    // If an error occurs during authentication, log the error and send 400 Bad Request response
    console.log(error);
    return res.sendStatus(400);
  }
};
