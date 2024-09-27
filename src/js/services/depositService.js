const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => {
  redirectTomeAtmMenu();
});

const panelDigitConfirmButton = $("#panelDigitConfirmButton");

panelDigitConfirmButton.addEventListener("click", () => {
  Swal.fire({
    title: "Desea confirmar la transacción?",
    showDenyButton: true,
    confirmButtonText: "Confirmar",
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Transacción efectuada!", "", "success");
    }
  });
});
