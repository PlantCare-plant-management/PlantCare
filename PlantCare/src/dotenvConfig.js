// dotenvConfig.js
import { config } from "dotenv";

config();

export const URL = process.env.NEXT_API_BASE_URL;
