const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => {
  redirectTomeAtmMenu();
});

const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());

const pieChartServices = $("#pieServices");
const barChartIncomeTransacctions = $("#incomeTransacctionsChart");
const barCharOutTransacctions = $("#outTransacctionsChart");

new Chart(pieChartServices, {
  type: "doughnut",
  data: {
    labels: ["Agua potable", "Energía eléctrica", "Internet", "Telefonía"],
    datasets: [
      {
        label: "$ Costo Mensual",
        data: [12, 19, 3, 5],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

new Chart(barChartIncomeTransacctions, {
  type: "line",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# Transacciones entrantes por mes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 5,
        fill: true,
        backgroundColor: "rgba(13, 163, 28, 0.459)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

new Chart(barCharOutTransacctions, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# Trasacciones salientes por Mes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: "rgb(253 186 116)",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
