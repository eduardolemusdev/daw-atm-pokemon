const tabButtons = document.querySelectorAll("button[bank-operation]");

class Currency {
  amountInCents = 0;
  constructor(amount) {
    this.setAmount(amount);
  }

  add(...amounts) {
    for (const amountItem of amounts) {
      if (amountItem instanceof Currency) {
        this.amountInCents += amountItem.getAmountCents();
      }
    }
  }

  getAmountCents() {
    return this.amountInCents;
  }

  isValidAmountFormat(amount) {
    const validAmountRegex = /^\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/;
    const isValidAmount = validAmountRegex.test(amount);

    return isValidAmount;
  }

  setAmount(amount) {
    const isValidAmount = this.isValidAmountFormat(amount);

    if (!isValidAmount) {
      throw new Error("Formato del monto no valido.");
    }
    this.amountInCents = parseFloat(amount.replace(",", "")) * 100;
  }
}
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

const atm = new ATM();

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", (e) => {
    const currentOperation = tabButton.getAttribute("bank-operation");
    const tabContent = document.getElementById(currentOperation);

    //logica para desactivar tab previa
    const currentTab = document.querySelector(".tabcontent-active");
    if (currentTab) {
      currentTab.classList.remove("tabcontent-active");
      currentTab.classList.add("tabcontent");
      const tabsContent = document.querySelectorAll(".tabcontent");

      const filteredTabsContent = Array.from(tabsContent).filter((leftTab) => {
        return currentOperation !== leftTab.getAttribute("id");
      });
      filteredTabsContent.forEach((leftTab) => {
        leftTab.classList.add("tabcontent");
        leftTab.classList.remove("tabcontent-active");
      });
    }

    if (currentOperation === "deposit") {
      atm.addTransaction("AB", "1,000.21", TRANSACTIONS_TYPES.DEPOSIT);
    }
    tabContent.classList.remove("tabcontent");
    tabContent.classList.add("tabcontent-active");
  });
});
