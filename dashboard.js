document.getElementById("add-account-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("account-name").value;
  const currency = document.getElementById("account-currency").value;
  const balance = document.getElementById("account-balance").value;

  try {
    await apiCall("/accounts", "POST", { name, currency, balance });
    alert("Account added!");
    fetchAccounts();
  } catch (error) {
    alert(error.message);
  }
});

async function fetchAccounts() {
  try {
    const accounts = await apiCall("/accounts");
    const list = document.getElementById("account-list");
    list.innerHTML = accounts
      .map((account) => `<li>${account.name} (${account.currency}): ${account.balance}</li>`)
      .join("");
  } catch (error) {
    alert(error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    showDashboard();
    fetchAccounts();
  } else {
    showLogin();
  }
});
