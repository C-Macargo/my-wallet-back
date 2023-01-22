import { Router } from 'express'
import { walletContent } from '../controller/Wallet.js'
import { transaction } from '../controller/Transaction.js'
import { walletMiddleware } from '../middlewares/WalletMiddleware.js'


const walletRouter = Router()

walletRouter.use(walletMiddleware)

walletRouter.get("/wallet", walletContent)
walletRouter.post("/transaction", transaction)

export default walletRouter