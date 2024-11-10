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

class ATM {
  #accountsLocalStorageKey = "atm_db";

  addTransaction(destinyAccountID, amount, transactionType) {
    this.#validateAccountsKeyLocalStorageExist();

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
    };

    const senderTransactionHistoryItem = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleString(),
      amount: `$${transactionAmount.getAmountInDollars()}`,
      transactionType,
      moveType: TRANSACTION_MOVE_TYPE.OUTGOING,
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
    return senderTransactionHistoryItem;
  }

  checkAccountExist(accountID) {
    const accounts = JSON.parse(
      localStorage.getItem(this.#accountsLocalStorageKey)
    );

    return accounts.find((account) => account.bankAccount === accountID);
  }

  #validateAccountsKeyLocalStorageExist() {
    const accountsFromLocalStorage = localStorage.getItem(
      this.#accountsLocalStorageKey
    );
    const existAccounts = !!accountsFromLocalStorage;

    if (!existAccounts) {
      localStorage.setItem(this.#accountsLocalStorageKey, JSON.stringify([]));
    }
  }
}
