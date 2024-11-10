const signinButton = document.getElementById("getPIN");

const userDatabaseSimulation = (account, pin) => {
  let loacalSotargeUsers = JSON.parse(localStorage.getItem("atm_db"));

  if (!loacalSotargeUsers) {
    const db = [
      {
        name: "Ash Ketchum",
        bankAccount: "0987654321",
        pin: "1234",
        balance: "500", // Balance inicial
        transactionHistory: [], // Historial de transacciones
      },
      {
        name: "Misty Waterflower",
        bankAccount: "9876543210",
        pin: "1234",
        balance: "150.42",
        transactionHistory: [],
      },
      {
        name: "Brock Harrison",
        bankAccount: "5678901234",
        pin: "5678",
        balance: "1200",
        transactionHistory: [],
      },
      {
        name: "Jessie",
        bankAccount: "3456789012",
        pin: "8765",
        balance: "820.90",
        transactionHistory: [],
      },
      {
        name: "James",
        bankAccount: "6789012345",
        pin: "3456",
        balance: "950.25",
        transactionHistory: [],
      },
    ];
    localStorage.setItem("atm_db", JSON.stringify(db));
    loacalSotargeUsers = JSON.parse(localStorage.getItem("atm_db"));
  }

  return loacalSotargeUsers.find(
    (user) => user.bankAccount === account && user.pin === pin
  );
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
  const [account, pin] = value;

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

  const userExist = userDatabaseSimulation(account, pin);
  console.log(userExist);

  localStorage.setItem("atm_current_user", JSON.stringify(userExist));

  if (!userExist) {
    Swal.fire({
      title: "Error al intentar ingresar a su cuenta bancaria",
      text: "Cuenta ó PIN incorrectos",
      timer: 4000,
      icon: "error",
    });
    return;
  }

  await Swal.fire({
    title: `Bienvenido, ${userExist.name.toUpperCase()}`,
    timer: 4000,
    icon: "success",
  });

  //Redireccionar a pagina principal
  redirectTomeAtmMenu();
});
