const $ = (element) => document.querySelector(element);
const $$ = (elements) => document.querySelectorAll(elements);

const redirect = (url) => {
  window.location.href = url;
};
const redirectTomeAtmMenu = () => {
  redirect("/src/atm/atm-menu.html");
};

const redirectTomeAccountTransacctions = () => {
  redirect("/src/atm/account-transactions.html");
};

const redirectToAccountStats = () => {
  redirect("/src/atm/account-stats.html");
};

const redirectToWithdraws = () => {
  redirect("/src/atm/withdraw-account.html");
};

const redirectToDeposits = () => {
  redirect("/src/atm/deposit-account.html");
};

const redirectHome = () => {
  localStorage.setItem("atm_current_user", null);
  redirect("/src/");
};
