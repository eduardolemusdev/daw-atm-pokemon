const TRANSACTIONS_TYPES = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",

  WATER_SERVICE: "WATER_SERVICE",
  INTERNET_SERVICE: "INTERNET_SERVICE",
  ENERGY_SERVICE: "ENERGY_SERVICE",
  PHONE_SERVICE: "PHONE_SERVICE",
};

class ATM {
  #accountsLocalStorageKey = "ACCOUNTS";

  registerAccount(accountID) {
    this.#validateAccountsKeyLocalStorageExist();
    const accountsFromLocalStorage = localStorage.getItem(
      this.#accountsLocalStorageKey
    );

    const accounts = JSON.parse(accountsFromLocalStorage);

    const newAccount = {
      accountID,
      transacctions: [],
    };

    localStorage.setItem(
      this.#accountsLocalStorageKey,
      JSON.stringify([...accounts, newAccount])
    );
  }

  addTransaction(accountID, amount, transactionType) {
    this.#validateAccountsKeyLocalStorageExist();

    const accountsFromLocalStorage = localStorage.getItem(
      this.#accountsLocalStorageKey
    );

    const newAmmount = new Currency(amount);

    const accounts = JSON.parse(accountsFromLocalStorage);

    const accountToStartTransacction = accounts.find(
      (account) => account.accountID === accountID
    );

    const restAccounts = accounts.filter(
      (account) => account.accountID !== accountID
    );

    accountToStartTransacction.transacctions = [
      ...accountToStartTransacction.transacctions,
      {
        date: new Date().toLocaleString(),
        amount: newAmmount.getAmountCents(),
        transactionType,
      },
    ];

    localStorage.setItem(
      this.#accountsLocalStorageKey,
      JSON.stringify([...restAccounts, accountToStartTransacction])
    );
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
