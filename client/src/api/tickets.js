const BASE_URL = import.meta.env.VITE_API_URL || "/api";
async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the server. Make sure the API is running.");
  }

  if (response.status === 204) return null;

  let data = null;
  try {
    data = await response.json();
  } catch {
    // response had no JSON body
  }

  if (!response.ok) {
    const error = new Error(data?.error?.message || "Something went wrong");
    error.details = data?.error?.details || [];
    error.status = response.status;
    throw error;
  }

  return data;
}

export function getTickets(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);
  const query = params.toString();
  return request(`/tickets${query ? `?${query}` : ""}`);
}

export const getTicket = (id) => request(`/tickets/${id}`);

export const createTicket = (data) =>
  request("/tickets", { method: "POST", body: JSON.stringify(data) });

export const updateTicket = (id, data) =>
  request(`/tickets/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteTicket = (id) =>
  request(`/tickets/${id}`, { method: "DELETE" });