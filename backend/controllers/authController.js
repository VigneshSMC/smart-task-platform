const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.login = async (req, res) => {

    try {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
    message: "successfully logged in",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
}
catch(error) {
    res.status(500).json({messag: "server error"})
}
};

exports.getProfile = async (req, res) => {
  try {
       const user =
     await User.findById(
       req.user.id
     ).select("-password");

   res.status(200).json({

     success: true,

     data: user

   });

  }
  catch(error) {
       res.status(500).json({
     success: false,
     message: "Server Error"
   });

  }
}