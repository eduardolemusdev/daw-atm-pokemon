const currentUser = checkAuthUser();
const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => {
  redirectTomeAtmMenu();
});

const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

const loadTransactionsCurrentUser = () => {
  const tableTransactionBody = $("#tableTransactionBody");

  currentUser.transactionHistory.forEach((transaction) => {
    const row = document.createElement("tr");
    const isDeposit =
      transaction.transactionType === "DEPOSIT"
        ? "-"
        : transaction.destinyAccountID;
    const cells = [
      { tag: "th", text: transaction.id, attributes: { scope: "row" } },
      { tag: "td", text: transaction.transactionType },
      { tag: "td", text: transaction.amount },
      { tag: "td", text: isDeposit },
      { tag: "td", text: transaction.date },
    ];

    cells.forEach((cellData) => {
      const cell = document.createElement(cellData.tag);
      cell.textContent = cellData.text;

      // Añadir atributos, como `scope` para la primera celda
      if (cellData.attributes) {
        Object.entries(cellData.attributes).forEach(([key, value]) => {
          cell.setAttribute(key, value);
        });
      }

      row.appendChild(cell);
    });
    tableTransactionBody.appendChild(row);
  });
};
loadTransactionsCurrentUser();
