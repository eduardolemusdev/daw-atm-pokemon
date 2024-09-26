const listTransactionsButton = $('button[bank-operation="list-transactions"]');
const showChartsButton = $('[bank-operation="charts"]');

listTransactionsButton.addEventListener("click", () => {
  redirectTomeAccountTransacctions();
});

showChartsButton.addEventListener("click", () => {
  redirectToAccountStats();
});
