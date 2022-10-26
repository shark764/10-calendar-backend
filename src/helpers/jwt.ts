import { sign } from 'jsonwebtoken';

export const generateJWT = async (
  uId: string,
  name: string
): Promise<string | undefined> => {
  const promise: string | undefined = await new Promise((resolve, reject) => {
    const payload = { uId, name };
    const options = { expiresIn: '2h' };
    const secret = process.env.SECRET_JWT_SEED;
    if (secret !== undefined) {
      sign(payload, secret, options, (err, token) => {
        if (err !== null) {
          console.error(err);
          reject(new Error('Could not generate token'));
        }

        resolve(token);
      });
    } else {
      reject(new Error('No secret has been configured in server'));
    }
  });
  return promise;
};
