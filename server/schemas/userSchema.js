const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

module.exports = { registerSchema, loginSchema };
