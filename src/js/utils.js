const $ = (element) => document.querySelector(element);
const $$ = (elements) => document.querySelectorAll(elements);

const redirectTomeAtmMenu = () => {
  window.location.href = "/src/atm/atm-menu.html";
};

const redirectTomeAccountTransacctions = () => {
  window.location.href = "/src/atm/account-transactions.html";
};

const redirectToAccountStats = () => {
  window.location.href = "/src/atm/account-stats.html";
};
