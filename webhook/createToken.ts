import jwt from 'jsonwebtoken';

export default function createToken(apiKey: string) {
  // Split the key into ID and SECRET
  const [id, secret] = apiKey.split(':');

  // Create the token (including decoding secret)
  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: `/v3/admin/`,
  });

  return token;
}
