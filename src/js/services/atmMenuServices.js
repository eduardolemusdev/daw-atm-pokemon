const listTransactionsButton = $('button[bank-operation="list-transactions"]');

console.log(listTransactionsButton);

listTransactionsButton.addEventListener("click", () => {
  window.location.href = "/src/atm/account-transactions.html";
});
