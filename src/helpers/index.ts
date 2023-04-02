import crypto from 'crypto';

// A secret used to salt the authentication hash
const SECRET = 'HANIF-REST-API';

// Generate a random base64 string
export const random = () => crypto.randomBytes(128).toString('base64');

// Generate an authentication hash using the salt and password
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};
