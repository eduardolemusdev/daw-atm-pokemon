const TRANSACTIONS_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",

  WATER_SERVICE: "WATER_SERVICE",
  INTERNET_SERVICE: "INTERNET_SERVICE",
  ENERGY_SERVICE: "ENERGY_SERVICE",
  PHONE_SERVICE: "PHONE_SERVICE",
};

const TRANSACTION_MOVE_TYPE = {
  INCOMING: "INCOMING",
  OUTGOING: "OUTGOING",
};
const services = [
  {
    npe: "12345-678-90123-45678",
    monto: "25.50",
    tipo: TRANSACTIONS_TYPES.WATER_SERVICE,
  },
  {
    npe: "23456-789-01234-56789",
    monto: "50.75",
    tipo: TRANSACTIONS_TYPES.ENERGY_SERVICE,
  },
  {
    npe: "34567-890-12345-67890",
    monto: "30.20",
    tipo: TRANSACTIONS_TYPES.INTERNET_SERVICE,
  },
  {
    npe: "45678-901-23456-78901",
    monto: "40.00",
    tipo: TRANSACTIONS_TYPES.PHONE_SERVICE,
  },
  {
    npe: "56789-012-34567-89012",
    monto: "18.90",
    tipo: TRANSACTIONS_TYPES.WATER_SERVICE,
  },
  {
    npe: "67890-123-45678-90123",
    monto: "60.00",
    tipo: TRANSACTIONS_TYPES.ENERGY_SERVICE,
  },
  {
    npe: "78901-234-56789-01234",
    monto: "25.75",
    tipo: TRANSACTIONS_TYPES.PHONE_SERVICE,
  },
  {
    npe: "89012-345-67890-12345",
    monto: "35.00",
    tipo: TRANSACTIONS_TYPES.INTERNET_SERVICE,
  },
  {
    npe: "90123-456-78901-23456",
    monto: "22.40",
    tipo: TRANSACTIONS_TYPES.WATER_SERVICE,
  },
  {
    npe: "01234-567-89012-34567",
    monto: "45.80",
    tipo: TRANSACTIONS_TYPES.ENERGY_SERVICE,
  },
];

class ATM {
  #accountsLocalStorageKey = "atm_db";

  addTransaction(destinyAccountID, amount, transactionType) {
    const accounts = JSON.parse(
      localStorage.getItem(this.#accountsLocalStorageKey)
    );

    const transactionAmount = new Currency(amount);

    const destinyAccount = this.checkAccountExist(destinyAccountID);
    if (!destinyAccount) {
      throw new Error("Cuenta de destino no existe.");
    }

    const senderAccount = JSON.parse(localStorage.getItem("atm_current_user"));
    if (!senderAccount) {
      throw new Error("Servicio no disponible.");
    }

    console.log(senderAccount, destinyAccount);

    const senderFounds = new Currency(senderAccount.balance);

    const destinyFounds = new Currency(destinyAccount.balance);

    console.log(destinyFounds, senderFounds);

    const insuficentFounds =
      transactionAmount.amountInCents > senderFounds.amountInCents;
    if (insuficentFounds) {
      throw new Error(
        "Fondos insuficientes, el monto de la transacción es mayor al balance de su cuenta."
      );
    }

    // moviemiento de dinero

    const transactionMountInCents = transactionAmount.amountInCents;
    senderFounds.substractInCents(transactionMountInCents);
    destinyFounds.add(transactionMountInCents);

    senderAccount.balance = `${senderFounds.getAmountInDollars()}`;
    destinyAccount.balance = `${destinyFounds.getAmountInDollars()}`;

    // separamos la cuenta para actualizarlas y agergarls despues
    const restAccounts = accounts
      .filter((account) => account.bankAccount !== senderAccount.bankAccount)
      .filter((account) => account.bankAccount !== destinyAccountID);

    // creamos los items de los historiales de transacciones de cada cuenta
    const destinyTransactionHistoryItem = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      amount: `$${transactionAmount.getAmountInDollars()}`,
      transactionType,
      moveType: TRANSACTION_MOVE_TYPE.INCOMING,
      senderAccountID: senderAccount.bankAccount,
    };

    const senderTransactionHistoryItem = {
      id: crypto.randomUUID(),
      date: new Date().toUTCString(),
      amount: `$${transactionAmount.getAmountInDollars()}`,
      transactionType,
      moveType: TRANSACTION_MOVE_TYPE.OUTGOING,
      destinyAccountID,
    };

    senderAccount.transactionHistory = [
      ...senderAccount.transactionHistory,
      senderTransactionHistoryItem,
    ];
    destinyAccount.transactionHistory = [
      ...destinyAccount.transactionHistory,
      destinyTransactionHistoryItem,
    ];

    console.log(restAccounts);

    const updatedAccountsDatabase = [
      ...restAccounts,
      senderAccount,
      destinyAccount,
    ];

    console.log(restAccounts);

    localStorage.setItem(
      this.#accountsLocalStorageKey,
      JSON.stringify(updatedAccountsDatabase)
    );

    //actualizamos el current user
    localStorage.setItem("atm_current_user", JSON.stringify(senderAccount));
    return {
      senderTransactionHistoryItem,
      destinyAccountID,
    };
  }

  startWithdraw(amount) {
    const accounts = JSON.parse(
      localStorage.getItem(this.#accountsLocalStorageKey)
    );

    const withdrawAmount = new Currency(amount);

    const userAccount = JSON.parse(localStorage.getItem("atm_current_user"));
    if (!userAccount) {
      throw new Error("Servicio no disponible.");
    }

    const userFounds = new Currency(userAccount.balance);

    if (withdrawAmount.amountInCents > userFounds.amountInCents) {
      throw new Error(
        "Fondos insuficientes, el monto de la transacción es mayor al balance de su cuenta."
      );
    }

    userFounds.substractInCents(withdrawAmount.amountInCents);

    userAccount.balance = `${userFounds.getAmountInDollars()}`;

    const restAccounts = accounts.filter(
      (account) => account.bankAccount !== userAccount.bankAccount
    );

    const withdrawHistoryItem = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      amount: `$${withdrawAmount.getAmountInDollars()}`,
      transactionType: TRANSACTIONS_TYPES.WITHDRAW,
      moveType: TRANSACTION_MOVE_TYPE.OUTGOING,
    };

    userAccount.transactionHistory = [
      ...userAccount.transactionHistory,
      withdrawHistoryItem,
    ];

    const updatedAccounts = [...restAccounts, userAccount];
    localStorage.setItem(
      this.#accountsLocalStorageKey,
      JSON.stringify(updatedAccounts)
    );

    localStorage.setItem("atm_current_user", JSON.stringify(userAccount));
    return {
      newBalance: `${userFounds.getAmountInDollars()}`,
      transaction: withdrawHistoryItem,
    };
  }

  npePayment(npe) {
    const currentUser = JSON.parse(localStorage.getItem("atm_current_user"));
    if (!currentUser) {
      throw new Error("Servicio no disponible");
    }

    const serviceToPay = services.find((service) => service.npe === npe);
    if (!serviceToPay) {
      throw new Error("NPE ingresado invalido, intentelo nuevamente.");
    }

    const npeAmount = new Currency(serviceToPay.monto);
    const userFounds = new Currency(currentUser.balance);

    if (npeAmount.amountInCents > userFounds.amountInCents) {
      throw new Error(
        "Fondos insuficientes, el monto de la transacción es mayor al balance de su cuenta."
      );
    }
    const serviceTransactionHistoryItem = {
      id: crypto.randomUUID(),
      npe: npe,
      date: new Date().toUTCString(),
      amount: `$${npeAmount.getAmountInDollars()}`,
      transactionType: serviceToPay.tipo,
      moveType: TRANSACTION_MOVE_TYPE.OUTGOING,
    };

    currentUser.transactionHistory = [
      ...currentUser.transactionHistory,
      serviceTransactionHistoryItem,
    ];

    localStorage.setItem("atm_current_user", JSON.stringify(currentUser));

    return serviceTransactionHistoryItem;
  }

  checkAccountExist(accountID) {
    const accounts = JSON.parse(
      localStorage.getItem(this.#accountsLocalStorageKey)
    );

    return accounts.find((account) => account.bankAccount === accountID);
  }
}
