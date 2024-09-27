const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => redirectTomeAtmMenu());

const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

const queryParams = new URLSearchParams(window.location.search);

const currentServiceToPay = queryParams.get("service");

const checkServiceProvided = async () => {
  if (!currentServiceToPay) {
    await Swal.fire({
      title: "Error: servicio a pagar no encontrado",
      icon: "error",
      timer: 2500,
    });

    redirectTomeAtmMenu();
  }
};

checkServiceProvided();

const paymentsTitle = $("#paymentsTitle");

const generateTitleServicePayment = () => {
  switch (currentServiceToPay) {
    case "water":
      return `Pago de servicios: Agua Potable 🚰`;
    case "energy":
      return `Pago de servicios: Energía Eléctrica ⚡️`;
    case "internet":
      return `Pago de servicios: Internet 🌐`;
    case "phone":
      return `Pago de servicios: Telefonía 📱`;
  }
};

paymentsTitle.textContent = generateTitleServicePayment();

const paymentServiceConfirmButton = $("#paymentServiceConfirmButton");

paymentServiceConfirmButton.addEventListener("click", () => {
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
