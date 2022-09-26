import app from '../server.js'
import https from 'https'
import UserDAO from '../dao/userDAO.js';
import mongodb from "mongodb"
import querystring from 'querystring'

const client = new mongodb.MongoClient(
    'mongodb://localhost:27017'
)
try {
    // connect to the MongoDB cluster
    await client.connect()
    await UserDAO.injectDB(client)

} catch (e) {
    console.error(e)
    process.exit(1)
}


const users = await UserDAO.listUser()
const data = JSON.stringify({
    // name: "John"
    users
})
// console.log(users)
const options = {
    hostname: "hookb.in",
    port: 443,
    path: "/Lgdw7zPKglu1lrp1aW6r",
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length
    }
}

const req = https.request(options, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });    
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// let response = {}
// if (req.query.id) {
//     response = await UserDAO.userById(req.query.id)
// } else {
//     response = await UserDAO.listUser()
// }
req.write(data)
req.end();