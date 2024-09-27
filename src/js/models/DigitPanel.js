class DigitPanel {
  constructor(
    digitsPanelInput,
    valueButtons,
    delButton,
    confirmButton,
    cancelButton
  ) {
    this.digitsPanelInput = digitsPanelInput;
    this.valueButtons = valueButtons;
    this.delButton = delButton;
    this.confirmButton = confirmButton;
    this.cancelButton = cancelButton;
  }

  initPanel() {
    this.valueButtons.forEach((element) => {
      element.addEventListener("click", (e) => {
        alert(e.target.value);
      });
    });
  }
}
