import { uri, port } from "./utils.js";
import express from 'express'
import { connect } from "mongoose";
import userRouter from './routers/account/user.js'
import salerRouter from './routers/account/saler.js'
import adminRouter from "./routers/account/admin.js";
import userAuthRouter from './routers/account/userAuth.js'
import salerAuthRouter from "./routers/account/salerAuth.js";
import adminAuthRouter from "./routers/account/adminAuth.js";
import { userMiddleWare } from './authMiddleWare/user.js'
import { salerMiddleWare } from './authMiddleWare/saler.js'
import { adminMiddleWare } from "./authMiddleWare/admin.js";
import forgetPasswordRouter from './routers/account/forgetpass.js'

connect(uri)
const app = express()
app.use(express.json())

app.use('/user', userRouter)
app.use('/saler', salerRouter)
app.use('/admin', adminRouter)
app.use('/user/dashboard', userMiddleWare, userAuthRouter)
app.use('/saler/dashboard', salerMiddleWare, salerAuthRouter)
app.use('/admin/dashboard', adminMiddleWare, adminAuthRouter)
app.use('/account', forgetPasswordRouter)

app.listen(port, (req, res) => console.log(`Port ${port} server is up ....`))

