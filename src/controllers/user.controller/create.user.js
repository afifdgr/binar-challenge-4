const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, email, password, identity_number, identity_type, address } =
    req.body;

  if (!name)
    return res.status(400).json({ error: true, message: "name is required" });

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  } else if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid email format" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  } else if (password.length < 8) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 8 characters long",
    });
  }

  if (!identity_number)
    return res
      .status(400)
      .json({ error: true, message: "identity_number is required" });

  if (!identity_type)
    return res
      .status(400)
      .json({ error: true, message: "identity_type is required" });

  if (!address)
    return res
      .status(400)
      .json({ error: true, message: "address is required" });

  const existingEmail = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (existingEmail)
    return res
      .status(400)
      .json({ error: true, message: "Email already registered" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        profile: {
          create: {
            identity_number: identity_number,
            identity_type: identity_type,
            address: address,
          },
        },
      },
    });

    const response = {
      ...user,
    };

    return res.status(201).json({
      error: false,
      message: "register user Successfully ",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
};
