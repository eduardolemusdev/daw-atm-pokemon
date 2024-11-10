const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => redirectTomeAtmMenu());

const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

const panelDigitConfirmButton = $("#panelDigitConfirmButton");

panelDigitConfirmButton.addEventListener("click", () => {
  try {
    const trasactionAmount = $("#moneyAmount").textContent;
    const destinyAccoundID = $("#accountDestination").value;

    const atm = new ATM();
    const transaction = atm.addTransaction(
      destinyAccoundID,
      trasactionAmount,
      TRANSACTIONS_TYPES.DEPOSIT
    );
    Swal.fire({
      title: "Desea confirmar la transacción?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      console.log(result);

      if (result.isConfirmed) {
        Swal.fire(
          "Transacción efectuada!" +
            `\nID: ${transaction.id}` +
            `\nMonto: ${transaction.amount}` +
            `\nFecha: ${transaction.date}`,
          "",
          "success"
        );
      }
    });
  } catch (error) {
    console.log(error);

    Swal.fire({
      title: error.message,
      confirmButtonText: "OK",
      icon: "error",
    });
  }
});
