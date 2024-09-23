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

  #isValidAmountFormat(amount) {
    const validAmountRegex = /^\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/;
    const isValidAmount = validAmountRegex.test(amount);

    return isValidAmount;
  }

  setAmount(amount) {
    const isValidAmount = this.#isValidAmountFormat(amount);

    if (!isValidAmount) {
      throw new Error("Formato del monto no valido.");
    }
    this.amountInCents = parseFloat(amount.replace(",", "")) * 100;
  }
}
