import app from './server.js'
import UserDAO from './dao/userDAO.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

async function main() {
    dotenv.config()
    const client = new mongodb.MongoClient(
        process.env.ADMIN_DB_URI       
    )
    const port = process.env.PORT    
    try {
        // connect to the MongoDB cluster
        await client.connect()
        await UserDAO.injectDB(client)
        
        app.listen(port, () => {
            console.log('Server is running on port: ' + port)
        })

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
main().catch(console.error);