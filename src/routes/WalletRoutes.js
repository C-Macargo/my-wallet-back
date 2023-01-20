import { Router } from 'express'
import { walletContent } from '../controller/Wallet.js'
import { deposit } from '../controller/Deposit.js'
import { withdraw } from '../controller/Withdraw.js'

const walletRouter = Router()

walletRouter.get("/wallet", walletContent)
walletRouter.post("/wallet/deposit", deposit)
walletRouter.post("/wallet/withdraw", withdraw)


export default walletRouter