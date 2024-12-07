const API_URL = "https://wedata.onrender.com/api";

async function apiCall(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}