import { signUp  } from "../controller/Auth.js"
import { Router } from 'express'

const authRouter = Router()

authRouter.post("/sign-up", signUp)

export default authRouter