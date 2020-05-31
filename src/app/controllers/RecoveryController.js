const user = require("../models/User");
const User = require("../models/User");
const crypto = require("crypto");

class RecoveryController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.find({ email });

    if (!user) return res.json({ error: "user not found" });

    //Gerar Token
    //Gerar data de expirasção
    user.recovery.token = crypto.randomBytes(10).toString("hex");
    user.recovery.date = new Date();
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }
}

module.exports = new RecoveryController();
