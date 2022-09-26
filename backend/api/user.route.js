import express from 'express'
import UserController from './user.controller.js'

const router = express.Router()
// router.route('/').get((req, res) => res.send('hello world'))
router.route('/').get(UserController.apiGetUser)
router.route('/').post(UserController.apiPostUser)
router.route('/').delete(UserController.apiDeleteUser)
router.route('/').put(UserController.apiUpdateUser)
router.route('/notify').post(UserController.apiNotify)
export default router