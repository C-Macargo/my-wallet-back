import { Router } from 'express'
import { walletContent } from '../controller/Wallet.js'
import { deposit } from '../controller/Deposit.js'

const walletRouter = Router()

walletRouter.get("/wallet", walletContent)
walletRouter.post("/wallet/deposit", deposit)

export default walletRouter