class Currency {
  amountInCents = 0;
  constructor(amount) {
    this.#setAmount(amount);
  }

  add(cents) {
    this.amountInCents = this.amountInCents + cents;
  }

  substractInCents(cents) {
    if (cents > this.#isValidAmountFormat) {
      throw new Error("La cantidad a restar es mayor que el balance.");
    }

    this.amountInCents = this.amountInCents - cents;

    return this.amountInCents;
  }

  getAmountCents() {
    return this.amountInCents;
  }

  getAmountInDollars() {
    return this.amountInCents / 100;
  }

  #isValidAmountFormat(amount) {
    const validAmountRegex = /^\d+(\.\d{1,2})?$/;

    const isValidAmount = validAmountRegex.test(amount);

    return isValidAmount;
  }

  #setAmount(amount) {
    const isValidAmount = this.#isValidAmountFormat(amount);

    if (!isValidAmount) {
      throw new Error(
        "Por favor, ingresa un monto válido. Ejemplo de formato: 1000.49 ó 10.50"
      );
    }
    this.amountInCents = Math.round(parseFloat(amount.replace(",", "")) * 100);
  }
}
