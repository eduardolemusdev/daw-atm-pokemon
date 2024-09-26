const listTransactionsButton = $('button[bank-operation="list-transactions"]');
const showChartsButton = $('[bank-operation="charts"]');

listTransactionsButton.addEventListener("click", () => {
  redirectTomeAccountTransacctions();
});

showChartsButton.addEventListener("click", () => {
  redirectToAccountStats();
});

const paymentSelect = document.getElementById("servicePaymentSelect");

paymentSelect.addEventListener("change", (e) => {
  const optionSelected = e.target.value || null;
  console.log(optionSelected);

  if (optionSelected) {
    window.location.href = `/src/atm/basic-services-payment.html?service=${optionSelected}`;
  }
});
