import express from 'express';

import { login, register } from '../controllers/authentication';

// Exporting a function that receives a 'router' object as parameter
export default (router: express.Router) => {
  // Defining a POST route for registering a new user, which invokes the 'register' function
  router.post('/auth/register', register);

  // Defining a POST route for logging in an existing user, which invokes the 'login' function
  router.post('/auth/login', login);
};
