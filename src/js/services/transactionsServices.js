const redirectAtmMenuBtn = $("#redirectAtmMenuBtn");

redirectAtmMenuBtn.addEventListener("click", () => {
  redirectTomeAtmMenu();
});

const logoutButton = $("#logoutButton");

logoutButton.addEventListener("click", () => redirectHome());
