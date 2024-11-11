const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");
const currentUser = checkAuthUser();

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

//primero obtenemos los tipos de transacion unicos que tiene el usuario,
// ["deposit", "deposit", "deposit", "withdraw", "withdraw"]
// => ["deposit", "withdraw"]
const transactionTypes = Array.from(
  new Set(
    currentUser.transactionHistory.map(
      (transaction) => transaction.transactionType
    )
  )
).map((type) => {
  return {
    type,
    totalAmount: 0,
  };
});

let chartData = [];
currentUser.transactionHistory.forEach((transaction) => {
  // Encontrar el tipo de transacción correspondiente en el arreglo transactionTypes
  const typeObj = transactionTypes.find(
    (t) => t.type === transaction.transactionType
  );

  const restOfTypes = transactionTypes.filter(
    (t) => t.type !== transaction.transactionType
  );

  // Sumar el amount de la transacción al totalAmount del tipo correspondiente
  if (typeObj) {
    typeObj.totalAmount += parseFloat(transaction.amount.replace("$", ""));
  }

  chartData = [...restOfTypes, typeObj];
});

console.log(chartData);

new Chart(barChartIncomeTransacctions, {
  type: "line",
  data: {
    labels: chartData.map((item) => item.type),
    datasets: [
      {
        label: "# Transacciones entrantes por mes",
        data: chartData.map((item) => item.totalAmount),

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
