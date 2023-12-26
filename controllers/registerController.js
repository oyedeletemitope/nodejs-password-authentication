const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;

const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });

  //check for duplicate usernames  in databses

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendsStatus(409); //conflict

  try {
    // enccrupt password

    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ success: `new user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};

module.exports = registerController;
