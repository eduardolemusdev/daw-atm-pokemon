const $ = (element) => document.querySelector(element);
const $$ = (elements) => document.querySelectorAll(elements);

const redirect = (url) => {
  window.location.href = url;
};
const redirectTomeAtmMenu = () => {
  redirect("/atm/atm-menu.html");
};

const redirectTomeAccountTransacctions = () => {
  redirect("/atm/account-transactions.html");
};

const redirectToAccountStats = () => {
  redirect("/atm/account-stats.html");
};

const redirectToWithdraws = () => {
  redirect("/atm/withdraw-account.html");
};

const redirectToDeposits = () => {
  redirect("/atm/deposit-account.html");
};

const redirectHome = () => {
  localStorage.setItem("atm_current_user", null);
  redirect("/");
};
