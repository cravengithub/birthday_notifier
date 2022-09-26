import UserDAO from "../dao/userDAO.js"
import node_schedule_tz from 'node-schedule-tz'

export default class UserController {
    static async apiGetUser(req, res, next) {
        try {
            let response = {}
            if (req.query.id) {
                response = await UserDAO.userById(req.query.id)
            } else {
                response = await UserDAO.listUser()
            }
            // response = await UserDAO.listUser()
            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiPostUser(req, res, next) {
        try {
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const birth_date = req.body.birth_date
            const location = req.body.location
            const email = req.body.email
            const addResponse = await UserDAO.addUser(
                first_name,
                last_name,
                birth_date,
                location,
                email
            )
            res.json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    }
    static async apiDeleteUser(req, res, next) {
        try {
            const id = req.body.id
            // console.log(id)
            const addResponse = await UserDAO.deleteUser(id)
            res.json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    }
    static async apiUpdateUser(req, res, next) {
        try {
            let userRes = await UserDAO.userById(req.body.id)
            userRes.first_name = req.body.first_name
            userRes.last_name = req.body.last_name
            userRes.birth_date = req.body.birth_date
            userRes.location = req.body.location
            userRes.email = req.body.email
            // console.log(userRes)
            const addResponse = await UserDAO.updateUser(userRes._id, userRes)
            res.json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    }

    static async apiNotify(req, res, next) {
        try {
            const users = await UserDAO.listUser()
            const today = new Date()
            // console.log(today.getDate() + '*****' + today.getMonth())
            let message = {}
            users.forEach(usr => {
                let birth = usr.birth_date
                // console.log(usr.last_name + ' ' + birth.getDate() + ' ' + (birth.getMonth()))
                // console.log(usr)
                // console.log('\n')
                let schedule = node_schedule_tz
                if ((birth.getDate() == 20) & (birth.getMonth() == 1)) {
                    message = "Hey, " + usr.first_name + " " + usr.last_name + " " + "it’s your birthday."
                    schedule.scheduleJob('sch', '* * 9 ' + today.getDate() + ' '
                        + today.getMonth() + ' *', usr.location, function () {
                            res.json({
                                status: 'success',
                                notification: message
                            })
                        });

                }
            });

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}