import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_BASE_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

const env = parsedEnv.data;

export default env;
