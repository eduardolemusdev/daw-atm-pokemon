import { PdfService } from "./pdfService";

const digitsPanel = new DigitPanel();
const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");
const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

redirectAtmMenuBtn.addEventListener("click", () => {
  redirectTomeAtmMenu();
});

const panelDigitConfirmButton = $("#panelDigitConfirmButton");

panelDigitConfirmButton.addEventListener("click", () => {
  try {
    const trasactionAmount = $("#moneyAmount").textContent;

    const atm = new ATM();
    const pdfService = new PdfService();

    Swal.fire({
      title: "Desea confirmar la transacción?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        const { transaction, newBalance } = atm.startWithdraw(trasactionAmount);
        pdfService.generateWithdrawPdf(
          transaction.id,
          trasactionAmount,
          newBalance
        );
        Swal.fire(
          "Retiro realizado con exito!" +
            `\nID: ${transaction.id}` +
            `\nMonto: ${transaction.amount}` +
            `\nFecha: ${transaction.date}`,
          "",
          "success"
        );
      }
    });
  } catch (error) {
    Swal.fire({
      title: error.message,
      confirmButtonText: "OK",
      icon: "error",
    });
  }
});
