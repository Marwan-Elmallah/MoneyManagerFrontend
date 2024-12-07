document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const data = await apiCall("/auth/login", "POST", { email, password });
    localStorage.setItem("token", data.token);
    showDashboard();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    await apiCall("/auth/signup", "POST", { name, email, password });
    alert("Signup successful! Please log in.");
    showLogin();
  } catch (error) {
    alert(error.message);
  }
});

// Navigation handlers
document.getElementById("register-btn").addEventListener("click", showSignup);
document.getElementById("back-to-login-btn").addEventListener("click", showLogin);

function showLogin() {
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("signup-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.add("hidden");
}

function showSignup() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("signup-container").classList.remove("hidden");
  document.getElementById("dashboard-container").classList.add("hidden");
}

function showDashboard() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("signup-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.remove("hidden");
}

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  showLogin();
});
