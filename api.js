const API_URL = "https://wedata.onrender.com/api";

// Helper function to make API calls
async function apiCall(endpoint, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error((await response.json()).message || "API Error");
  }
  return response.json();
}
