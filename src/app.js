import authRouter from "./routes/AuthRoutes.js"
import express from "express"
import cors from "cors"
import walletRouter from "./routes/WalletRoutes.js"

let PORT = 5000

const server = express()
server.use(express.json())
server.use(cors())

server.use([authRouter])
server.use([walletRouter])


server.listen(5000, () => {
  console.log(`Server running on port ${PORT}`)
})


