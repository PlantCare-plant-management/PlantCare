import jwt, { JwtPayload } from 'jsonwebtoken'

const SECRET = process.env.SECRET as string

export const signToken = (payload: JwtPayload) => {
    return jwt.sign(payload, SECRET)
}