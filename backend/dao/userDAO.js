import { ObjectId } from "mongodb"

let user
export default class UserDAO {
    // initializing database
    static async injectDB(conn) {
        if (user) {
            return
        }
        try {
            // user = await conn.db(process.env.ADMIN_NS).collection('user')
            user = await conn.db('admin').collection('user')
        } catch (e) {
            console.error('unable to connect in UserDAO: ${e}')
        }
    }
    // List of user
    static async listUser() {
        try {
            const cursor = await user.find({})
            return cursor.toArray()
        }
        catch (e) {
            console.error('unable to list user: ${e}')
            return { error: e }
        }
    }
    // get one user by id
    static async userById(id) {
        try {
            const cursor = await user.findOne({
                _id: ObjectId(id)
            })
            return cursor
        }
        catch (e) {
            console.error('unable to list user: ' + e)
            return { error: e }
        }
    }
    // Add user
    static async addUser(first_name, last_name, birth_date, location, email) {
        try {
            const userDoc = {
                first_name: first_name,
                last_name: last_name,
                birth_date: new Date(birth_date),
                location: location,
                email: email
            }
            return await user.insertOne(userDoc)
        } catch (e) {
            console.error('unable to post user: ${e}')
            return { error: e }
        }
    }
    // update user
    static async updateUser(id, userRes) {
        try {
            const updateResponse = await user.updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        first_name: userRes.first_name,
                        last_name: userRes.last_name,
                        birth_date: new Date(userRes.birth_date),
                        location: userRes.location,
                        email: userRes.email
                    }
                }
            )
            return updateResponse
        } catch (e) {
            console.error('unable to update user: ' + e.message)
            return { error: e }
        }
    }
    // remove user
    static async deleteUser(id) {
        try {
            const deleteResponse = await user.deleteOne({
                _id: ObjectId(id)
            })
            // console.log(deleteResponse)
            return deleteResponse
        } catch (e) {
            console.error('unable to delete review: $(e)')
            return { error: e }
        }
    }
}