const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => redirectTomeAtmMenu());

const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

const panelDigitConfirmButton = $("#panelDigitConfirmButton");

panelDigitConfirmButton.addEventListener("click", () => {
  try {
    const trasactionAmount = $("#moneyAmount").textContent;

    const currency = new Currency(trasactionAmount);
    console.log(currency.amountInCents);

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
          "Transacción efectuada!" + `$${trasactionAmount}`,
          "",
          "success"
        );
      }
    });
  } catch (error) {
    Swal.fire({
      title:
        "Por favor, ingresa un monto válido. Ejemplo de formato: 1000.49 ó 10.50",
      confirmButtonText: "OK",
      icon: "error",
    });
  }
});
