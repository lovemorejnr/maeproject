import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import type { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "../prisma";

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT ?? process.env.PORT ?? 4000);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : "*",
  })
);
app.use(express.json({ limit: "1mb" }));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const respondValidationError = (res: Response, message: string) => {
  res.status(400).json({ error: message });
};

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/forms/vehicle",
  async (req: Request, res: Response): Promise<void> => {
    const { submissionType } = req.body ?? {};
    const payload = req.body?.payload;

    if (!isRecord(payload)) {
      respondValidationError(res, "payload must be an object");
      return;
    }

    if (!isNonEmptyString(payload.make)) {
      respondValidationError(res, "make is required");
      return;
    }

    if (!isNonEmptyString(payload.model)) {
      respondValidationError(res, "model is required");
      return;
    }

    if (!isNonEmptyString(payload.contactEmail)) {
      respondValidationError(res, "contactEmail is required");
      return;
    }

    const formType =
      submissionType === "VEHICLE_UPDATE" ? "VEHICLE_UPDATE" : "VEHICLE_LISTING";

    try {
      const record = await prisma.formSubmission.create({
        data: {
          formType,
          payload: {
            ...payload,
            features: Array.isArray(payload.features) ? payload.features : [],
            submittedAt: new Date().toISOString(),
          },
        },
      });

      res.status(201).json({ id: record.id, formType });
    } catch (error) {
      console.error("Failed to save vehicle form submission", error);
      res.status(500).json({ error: "Unable to save vehicle form submission" });
    }
  }
);

app.post(
  "/api/forms/customer",
  async (req: Request, res: Response): Promise<void> => {
    const payload = req.body?.payload;

    if (!isRecord(payload)) {
      respondValidationError(res, "payload must be an object");
      return;
    }

    const requiredFields = [
      "name",
      "company",
      "email",
      "phone",
      "location",
      "type",
      "status",
    ] as const;

    for (const field of requiredFields) {
      if (!isNonEmptyString(payload[field])) {
        respondValidationError(res, `${field} is required`);
        return;
      }
    }

    try {
      const record = await prisma.formSubmission.create({
        data: {
          formType: "CUSTOMER_CREATE",
          payload: {
            ...payload,
            submittedAt: new Date().toISOString(),
          },
        },
      });

      res.status(201).json({ id: record.id, formType: "CUSTOMER_CREATE" });
    } catch (error) {
      console.error("Failed to save customer form submission", error);
      res.status(500).json({ error: "Unable to save customer form submission" });
    }
  }
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../dist");
const clientIndexPath = path.join(clientDistPath, "index.html");

if (fs.existsSync(clientIndexPath)) {
  app.use(express.static(clientDistPath, { index: false }));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path === "/health") {
      next();
      return;
    }

    res.sendFile(clientIndexPath);
  });
} else {
  console.warn(
    `Client build not found at ${clientIndexPath}. API routes will work, but static assets cannot be served until you run "npm run build".`
  );
}

const server = app.listen(port, () => {
  console.log(`Form submission API listening on http://localhost:${port}`);
});

const shutdown = async () => {
  console.log("Shutting down server...");
  server.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
