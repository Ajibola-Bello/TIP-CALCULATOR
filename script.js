// SELECTING ELEMENTS
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("number-people");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalDisplay = document.getElementById("total");
const resetBtn = document.getElementById("reset");
const errorText = document.querySelector(".error-text");

// STATE
let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

// MAIN CALCULATION FUNCTION
function calculateTip() {
  if (peopleValue <= 0) {
    showError();
    return;
  }

  hideError();

  const tipAmount = (billValue * (tipValue / 100)) / peopleValue;
  const totalAmount = (billValue + billValue * (tipValue / 100)) / peopleValue;

  tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
  totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
}

// ERROR HANDLING
function showError() {
  errorText.style.display = "block";
  peopleInput.classList.add("error");
}

function hideError() {
  errorText.style.display = "none";
  peopleInput.classList.remove("error");
}

// TIP BUTTON CLICK
tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    tipButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    tipValue = Number(button.dataset.tip);
    customTipInput.value = "";
    calculateTip();
  });
});

// CUSTOM TIP INPUT
customTipInput.addEventListener("input", () => {
  tipButtons.forEach(btn => btn.classList.remove("active"));
  tipValue = Number(customTipInput.value);
  calculateTip();
});

// BILL INPUT
billInput.addEventListener("input", () => {
  billValue = Number(billInput.value);
  calculateTip();
});

// PEOPLE INPUT
peopleInput.addEventListener("input", () => {
  peopleValue = Number(peopleInput.value);
  calculateTip();
});

// RESET BUTTON
resetBtn.addEventListener("click", () => {
  billValue = 0;
  tipValue = 0;
  peopleValue = 0;

  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";

  tipButtons.forEach(btn => btn.classList.remove("active"));

  tipAmountDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";

  hideError();
});
