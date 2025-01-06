import "dotenv/config";
import { defineConfig } from "orval";

export default defineConfig({
  "tasks-api": {
    input: {
      target: `${process.env.VITE_BACKEND_BASE_URL}/api-json`,
    },
    output: {
      mode: "tags-split",
      target: "src/api/backend",
      schemas: "src/api/backend/model",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/custom-backend-instance.ts",
          name: "customBackendInstance",
        },
      },
    },
  },
});
