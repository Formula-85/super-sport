// =========================
// 1. VARIABLES
// =========================

// --- Burger Menu ---
// Burger Menu Variables
let burger = document.getElementById("burger");
let burgerBox = document.getElementById("burger-box");
let openBurgerBox = false;

// Dropdown in burger menu Variables
let burgerDropdown = document.getElementById("burger-dropdown");
let burgerDropdownBox = document.getElementById("burger-dropdown-box");
let openBurgerDropdown = false;

// --- loading ---
let loading = document.getElementById("loading");
let body = document.getElementById("body");

// --- footer ---
const footerTitle = document.querySelectorAll(".footer-title");

// =========================
// 2. FUNCTIONS
// =========================

// --- Convertet ---

// Convert Persian Numbers to English and Separate Numbers by Thousands
export function englishToPrsian(value) {
  let num = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

// For Discount Calculation
export function discountPrice(priceNum, discountNum) {
  let discount = discountNum.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  discount = parseInt(discount);
  let price = priceNum.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  price = parseInt(price.replace(/,/g, ""));
  let finalprice = price - price * (discount / 100);
  finalprice = finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  finalprice = finalprice.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  return finalprice;
}

// --- loading ---

// Waiting for images to load
export function waitForImagesToLoad() {
  const images = Array.from(document.querySelectorAll("img"));
  return Promise.all(
    images.map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = img.onerror = resolve;
        }
      });
    })
  );
}

// Remove loading
export function offLoading() {
  loading.classList.add("aiLoading");
  setTimeout(() => {
    loading.classList.add("offLoading");
    body.classList.remove("overflow-hidden");
  }, 250);
}

// --- tag a---

// Slowing down link execution to fix animation issues on touch screens.
export function slowingLink() {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const href = this.href;

      setTimeout(() => {
        window.location.href = href;
      }, 700);
    });
  });
}

// --- drag ---

// Enable drag mode
export function drag(value) {
  const slider = document.querySelector(value);

  // Necessary variables for mouse position and state
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// =========================
// 3. EVENT LISTENERS
// =========================

// --- burger menu ---

// open burger menu
burger.addEventListener("click", () => {
  if (openBurgerBox) {
    openBurgerBox = false;
    burgerBox.style = "";
  } else {
    openBurgerBox = true;
    burgerBox.style.right = "0%";
  }
});

// open Dropdown in burger menu
burgerDropdown.addEventListener("click", () => {
  if (openBurgerDropdown) {
    openBurgerDropdown = false;
    burgerDropdownBox.style.height = "";
  } else {
    openBurgerDropdown = true;
    burgerDropdownBox.style.height = burgerDropdownBox.scrollHeight + "px";
  }
});

// --- footer ---
// Opening and closing footer lists
footerTitle.forEach((title) => {
  const list = title.nextElementSibling;
  list.style.height = list.scrollHeight + "px";
  let open = true;
  title.addEventListener("click", () => {
    if (open) {
      list.style.height = " 0px";
      open = false;
    } else {
      list.style.height = list.scrollHeight + "px";
      open = true;
    }
  });
});
