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
    redirect(`/src/atm/basic-services-payment.html?service=${optionSelected}`);
  }
});
