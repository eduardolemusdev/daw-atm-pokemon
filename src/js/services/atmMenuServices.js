const listTransactionsButton = $('button[bank-operation="list-transactions"]');
const showChartsButton = $('[bank-operation="charts"]');
const withdrawButton = $('[bank-operation="withdraw"]');
const depositButton = $('[bank-operation="deposit"]');
const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

depositButton.addEventListener("click", () => redirectToDeposits());

listTransactionsButton.addEventListener("click", () =>
  redirectTomeAccountTransacctions()
);

showChartsButton.addEventListener("click", () => redirectToAccountStats());

withdrawButton.addEventListener("click", () => redirectToWithdraws());

const paymentSelect = document.getElementById("servicePaymentSelect");

paymentSelect.addEventListener("change", (e) => {
  const optionSelected = e.target.value || null;
  console.log(optionSelected);

  if (optionSelected) {
    redirect(`/atm/basic-services-payment.html?service=${optionSelected}`);
  }
});

//init current user data
const currentUser = JSON.parse(localStorage.getItem("atm_current_user"));
$("#userName").textContent = `Bienvenido ${currentUser.name}`;
$("#accountID").textContent = `Cuenta de ahorros ${currentUser.bankAccount}`;
const balanceDollars = new Currency(currentUser.balance);
console.log(balanceDollars.getAmountInDollars());

//agregamos ceros si es entero
const addZeros = balanceDollars.getAmountInDollars() % 1 === 0 ? ".00" : "";
$(
  "#balanceAmount"
).textContent = `Balance: $${balanceDollars.getAmountInDollars()}${addZeros}`;

console.log(currentUser);
