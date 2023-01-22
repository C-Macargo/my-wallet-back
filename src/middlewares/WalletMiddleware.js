import db from "../config/database.js";

export async function walletMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Informe o token");

  try {
    const userSession = await db
      .collection("sessions")
      .findOne({ token: token });
    if (!userSession) return res.status(422).send("Acesso negado");
    res.locals.session = userSession;
    next();
  } catch (err) {
    return res.status(500).send(err);
  }
}
