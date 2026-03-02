import { SignJWT } from 'jose'
import env from '../../env.ts'
import { createSecretKey } from 'crypto'

export interface JWTPayload {
  // Define the shape of your JWT payload
  id: string
  username: string
  email: string
}

export const generateToken = async (payload: JWTPayload) => {
  const secret = env.JWT_SECRET
  const secretKey = createSecretKey(secret, 'utf-8')

  return await new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
  .sign(secretKey)
}
