import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  schema: path.join(projectRoot, "db", "schema.prisma"),
  migrations: {
    path: path.join(projectRoot, "db", "migrations"),
  },
});
