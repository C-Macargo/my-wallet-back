import { signUp  } from "../controller/SignUp.js"
import { Router } from 'express'
import { signIn } from "../controller/SignIn.js"
import { listUsers } from "../controller/Users.js"


const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.get("/users", listUsers)

export default authRouter