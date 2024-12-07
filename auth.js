// Event listener for the Login form submission
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

// Event listener for the Signup form submission
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

// Event listener for the "Register" button to show the Signup form
document.getElementById("register-btn").addEventListener("click", showSignup);

// Event listener for the "Back to Login" button to show the Login form
document.getElementById("back-to-login-btn").addEventListener("click", showLogin);

// Function to show the Login form
function showLogin() {
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("signup-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.add("hidden");
}

// Function to show the Signup form
function showSignup() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("signup-container").classList.remove("hidden");
  document.getElementById("dashboard-container").classList.add("hidden");
}

// Function to show the Dashboard
function showDashboard() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("signup-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.remove("hidden");
}

// Event listener for the Logout button
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  showLogin();
});