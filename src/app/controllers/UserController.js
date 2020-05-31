const User = require("../models/User");

class UserController {
  //Get
  async index(req, res) {
    const users = await User.find({});

    return res.json(users);
  }
  //Post
  async store(req, res) {
    const user = await User.create(req.body);

    return res.json({ user: user.getJson() });
  }

  //Put
  async update(req, res) {
    const { name, email, password, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.json({ error: "user not found" });

    if (email && email != user.email) {
      const userExists = await User.find({ email });

      if (userExists) return res.json({ error: "email ja está em uso" });

      user.email = email;
    }
    if (name) user.name = name;
    if (name) user.password = password;
    if (name) user.role = role;

    await user.save();

    return res.json({ user: user.getJson() });
  }

  //Delete
  async destroy(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) return res.json({ error: "user not found" });

    await user.remove();

    return res.json({ deleted: true });
  }
}

module.exports = new UserController();
