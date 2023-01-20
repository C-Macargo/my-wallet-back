import { signUp  } from "../controller/SignUp.js"
import { Router } from 'express'
import { login } from "../controller/Login.js"
import { listUsers } from "../controller/Users.js"

const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/login", login)
authRouter.get("/users", listUsers)

export default authRouter