class Transaction {
  #sourceAccountId = "";
  #destinationAccountId = "";
  #amount = 0.0;
  #transactionId = "";
  #transactionDate = new Date();

  constructor(amount, sourceAccountID, destinyAccountID) {
    this.#amount = amount;
    this.#sourceAccountId = sourceAccountID;
    this.#destinationAccountId = destinyAccountID;
    this.#transactionId = Math.floor(
      Math.random() * (99999 - 999 + 1) + 999
    ).toString();
  }

  getAmount() {
    return this.#amount.toString();
  }

  getTransacctionId() {
    return this.#transactionId;
  }

  getTransactionDate() {
    return this.#transactionDate;
  }

  getSourceAccountID() {
    return this.#sourceAccountId;
  }

  getDestinationAccountID() {
    return this.#destinationAccountId;
  }
}
