// Display accounts on the dashboard
async function fetchAccounts() {
  const accounts = await apiCall("/accounts", "GET");
  const accountList = document.getElementById("account-list");
  accountList.innerHTML = "";
  accounts.forEach(account => {
    const li = document.createElement("li");
    li.textContent = `${account.name} (${account.currency}): $${account.balance}`;
    accountList.appendChild(li);
  });
}

// Add a new account
document.getElementById("add-account-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("account-name").value;
  const currency = document.getElementById("account-currency").value;
  const balance = document.getElementById("account-balance").value;

  try {
    await apiCall("/accounts", "POST", { name, currency, balance });
    alert("Account added!");
    fetchAccounts(); // Re-fetch accounts after adding a new one
  } catch (error) {
    alert(error.message);
  }
});

// Fetch accounts when the dashboard is displayed
if (localStorage.getItem("token")) {
  fetchAccounts();
}