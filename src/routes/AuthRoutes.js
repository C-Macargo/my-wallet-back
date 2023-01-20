import { signUp  } from "../controller/SignUp.js"
import { Router } from 'express'
import { login } from "../controller/Login.js"

const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/login", login)

export default authRouter