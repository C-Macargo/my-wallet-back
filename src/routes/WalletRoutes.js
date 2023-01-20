import { Router } from 'express'
import { walletContent } from '../controller/Wallet.js'

const walletRouter = Router()

walletRouter.get("/wallet", walletContent)

export default walletRouter