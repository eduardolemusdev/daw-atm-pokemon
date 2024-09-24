const signinButton = document.getElementById("getPIN");

const userDatabaseSimulation = (account, pin) => {
  const db = [
    {
      name: "Ash Ketchum",
      bankAccount: "1234567890",
      pin: "4321",
    },
    {
      name: "Misty Waterflower",
      bankAccount: "9876543210",
      pin: "1234",
    },
    {
      name: "Brock Harrison",
      bankAccount: "5678901234",
      pin: "5678",
    },
    {
      name: "Jessie",
      bankAccount: "3456789012",
      pin: "8765",
    },
    {
      name: "James",
      bankAccount: "6789012345",
      pin: "3456",
    },
  ];

  return db.find((user) => user.bankAccount === account && user.pin === pin);
};

signinButton.addEventListener("click", async () => {
  const { value } = await Swal.fire({
    title: "Buen día, Ingresa tus credenciales.",
    html:
      '<input id="swalInputAccount" class="swal2-input" type="text" maxlength="10">' +
      '<input id="swalInputPIN" class="swal2-input" type="password" maxlength="4">',
    preConfirm: function () {
      return new Promise(function (resolve) {
        resolve([$("#swalInputAccount").value, $("#swalInputPIN").value]);
      });
    },
    didOpen: function () {
      const swalInputAccount = $("#swalInputAccount");
      swalInputAccount.focus();
    },
  });

  const invalidInputs = account.length < 10 || pin.length < 4;
  if (invalidInputs) {
    Swal.fire({
      title: "Error al intentar ingresar a su cuenta bancaria",
      text: "Cuenta ó PIN incorrectos",
      timer: 4000,
      icon: "error",
    });
    return;
  }

  const [account, pin] = value;
  const userExist = userDatabaseSimulation(account, pin);

  if (!userExist) {
    Swal.fire({
      title: "Error al intentar ingresar a su cuenta bancaria",
      text: "Cuenta ó PIN incorrectos",
      timer: 4000,
      icon: "error",
    });
    return;
  }

  Swal.fire({
    title: `Bienvenido, ${userExist.name.toUpperCase()}`,
    timer: 4000,
    icon: "success",
  });
  //Redireccionar a pagina principal
});
