const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ error: "Dados invalidos" });

    if (!user.checkPassword) return res.json({ error: "Dados invalidos" });

    return res.json(user.getJwt());
  }
}
module.exports = new SessionController();
