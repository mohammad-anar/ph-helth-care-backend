import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  bcrypt_solt_round: Number(process.env.BCRYPT_SOLT_ROUND),
  cloudinary_cloud_name: process.env.CLOUD_NAME,
  cloudinary_cloud_api_key: process.env.CLOUD_API_KEY,
  cloudinary_cloud_api_secret: process.env.CLOUD_API_SECRET,
};
