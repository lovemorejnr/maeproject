import type { Customer, Vehicle } from "../types";

const resolveBaseUrl = () => {
  const configuredBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
  if (configuredBase) {
    return configuredBase;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:4000";
    }
    return window.location.origin.replace(/\/$/, "");
  }

  return "http://localhost:4000";
};

const API_BASE_URL = resolveBaseUrl();

type VehicleFormSubmissionType = "VEHICLE_LISTING" | "VEHICLE_UPDATE";
type VehicleSubmissionPayload = Partial<Vehicle> & Record<string, unknown>;

async function postJson<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(
      `Unable to reach form submission API at ${API_BASE_URL}. Please ensure the server is running and accessible.`
    );
  }

  if (!response.ok) {
    const message = await response
      .json()
      .catch(() => ({ error: "Unknown server error" }));
    throw new Error(
      typeof message?.error === "string"
        ? message.error
        : `Request to ${path} failed with status ${response.status}`
    );
  }

  return response.json();
}

export const submitVehicleForm = async (
  payload: VehicleSubmissionPayload,
  submissionType: VehicleFormSubmissionType = "VEHICLE_LISTING"
) => {
  return postJson<{ id: string; formType: VehicleFormSubmissionType }>(
    "/api/forms/vehicle",
    {
      submissionType,
      payload,
    }
  );
};

export const submitCustomerForm = async (
  payload: Omit<Customer, "id" | "initials" | "totalSpent" | "purchases" | "enquiries" | "lastContact">
) => {
  return postJson<{ id: string; formType: "CUSTOMER_CREATE" }>(
    "/api/forms/customer",
    {
      payload,
    }
  );
};
