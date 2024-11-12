import { PdfService } from "./pdfService";

const currentUser = checkAuthUser();

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
$("#npeInput").addEventListener("input", (e) => {
  const inputValue = e.target.value;
  if (inputValue.length === 5 && e.inputType !== "deleteContentBackward") {
    e.target.value = e.target.value + "-";
  }
  if (inputValue.length === 9 && e.inputType !== "deleteContentBackward") {
    e.target.value = e.target.value + "-";
  }
  if (inputValue.length === 14 && e.inputType !== "deleteContentBackward") {
    e.target.value = e.target.value + "-";
  }
});
paymentServiceConfirmButton.addEventListener("click", () => {
  try {
    const npeValue = $("#npeInput").value;

    const atm = new ATM();
    const { npe, amount, id, date, transactionType } = atm.npePayment(npeValue);

    Swal.fire({
      title: "Desea confirmar la transacción?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const pdfService = new PdfService();
        pdfService.npeTransaction(npe, amount, id, date, transactionType);
        Swal.fire("Transacción efectuada!", "", "success");
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
