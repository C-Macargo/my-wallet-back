import { Router } from 'express'
import { walletContent } from '../controller/Wallet.js'
import { transaction } from '../controller/Transaction.js'
import { walletMiddleware } from '../middlewares/WalletMiddleware.js'
import { balance } from '../controller/Balance.js'

const walletRouter = Router()

walletRouter.use(walletMiddleware)

walletRouter.get("/balance",balance )
walletRouter.get("/wallet", walletContent)
walletRouter.post("/transaction", transaction)

export default walletRouter