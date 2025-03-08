import jwt from "jsonwebtoken";

const SECRET_KEY = "LSNEAKERSTOKENSECRET"; // Cámbialo en producción

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "2h" });

    return res.status(200).json({ token });
  }

  res.status(401).json({ error: "Credenciales incorrectas" });
};
