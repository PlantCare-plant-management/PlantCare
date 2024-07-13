import db from "../db/conn.mjs"
import { checkPass, hashPass, signToken } from "../helpers/bcrypt.mjs"

class Users {
    static async getUsers(req, res, next) {
        try {
            let collection = await db.collection("user")
            let result = await collection.find().toArray()
            console.log(result)
            res.json({result}).status(200)
        } catch (error) {
            console.log(error)
        }
    }

    static async register(req, res, next) {
        try {
            let {username, password, email, name} = req.body
            if(!username || !password || !email) {
                throw "username or password or email required"
            }
            password = hashPass(password)
            if(!name) {
                name = username
            }
            const user = await db.collection("user").insertOne({name, email, username,password})
            res.json({message : "success add users with username " +username}).status(201)
        } catch (error) {
            console.log(error)
        }
    }

    static async login(req, res, next) {
        try {
            let {username, password} = req.body
            if(!username || !password) {
                throw "username or password required"
            }
            const user = await db.collection("user").findOne({username})
            if(!user){
                throw new Error ("Invalid username")
            } 
            const checkpass = checkPass(password, user.password)
            if(!checkPass) {
                throw new Error ("Invalid password")
            }
            const token = {
                accessToken: signToken({id : user._id, username})
            }
            res.json(token).status(200)

        } catch (error) {
            console.log(error)
        }
    }
}

export default Users