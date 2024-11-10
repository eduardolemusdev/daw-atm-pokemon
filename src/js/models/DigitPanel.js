class DigitPanel {
  panelValue = "";

  constructor(digitsPanelInput, valueButtons, deleteButton) {
    this.digitsPanelInput = digitsPanelInput;
    this.valueButtons = valueButtons;
    this.deleteButton = deleteButton;
  }

  initPanel() {
    this.valueButtons.forEach((element) => {
      element.addEventListener("click", (e) => {
        const btnValue = e.target.textContent.trim();

        this.panelValue = this.panelValue.concat(btnValue);

        this.digitsPanelInput.textContent = this.panelValue;
      });
    });

    this.deleteButton.addEventListener("click", () => {
      this.panelValue = this.panelValue.slice(0, -1);

      this.digitsPanelInput.textContent = this.panelValue;
    });
  }
}

const panelInput = $("#moneyAmount");
const deleteButton = $("#deleteBtn");
const panelButtons = $$(".digitsPanelButton");
console.log(deleteButton);

const panel = new DigitPanel(panelInput, panelButtons, deleteButton);
panel.initPanel();
