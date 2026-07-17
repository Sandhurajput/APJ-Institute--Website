const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;

  // Required Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, Email and Message are required",
    });
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Email Format",
    });
  }

  next();
};

export default validateContact;