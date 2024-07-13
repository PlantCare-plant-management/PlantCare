import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const hashPass = (password) => {
    var salt = bcrypt.genSaltSync(10);
 return bcrypt.hashSync(password, salt);
}

export const checkPass = (password, passwordDb) => {
    return bcrypt.compareSync(password, passwordDb);
}

export const signToken = (payload) => {
    return jwt.sign(payload, "shhh")
}