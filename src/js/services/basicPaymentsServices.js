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
