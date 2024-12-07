const User=require("../models/signup.model")

const bcrypt=require("bcrypt")

 const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password, confirmpassword } =
    req.body;
  try {
    if (password != confirmpassword) {
      return res
        .status(401)
        .send({ message: "password and confirm password are different" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).send({ message: "Username already exist" });
    }
    //hash password
    const passwordhash = await bcrypt.hash(password, 10);

    const newuser = new User({
      username,
      email,
      password: passwordhash,

    });
    await newuser.save();
    res.status(201).json({
      _id: newuser._id,
      username: newuser.username,
      email: newuser.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server Error" });
  }
};
 const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const isvalidpassword = await bcrypt.compare(
    password,
    user ? user.password : " "
  );
  if (!user || !isvalidpassword) {
    return res.status(404).send({ message: "Invalid username or password" });
  }
  
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
};
module.exports={login,signup}