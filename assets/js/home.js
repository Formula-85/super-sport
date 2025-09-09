// =========================
// IMPORTS
// =========================

import {
  englishToPrsian,
  discountPrice,
  waitForImagesToLoad,
  offLoading,
  slowingLink,
  drag,
  alertError,
} from "./main.js";

// =========================
// 1. VARIABLES
// =========================

// --- intro ---
let sizeDataIntro;
// this for small circles at the bottom of the slides
let btnIntroBox = document.getElementById("btns-intro");
let btnIntro;
// In order: for accessing the element that contains the slides, the slides themselves, and the slide position.
let slidersBox = document.getElementById("boxSlider");
let sliders;
let positionSlides = 0;
// for right and left btn
let rightBtnIntro;
let leftBtnIntro;

// --- best_products ---
let boxBestProducts = document.getElementById("boxBestProducts");

// --- ADs ---
let ADimg = document.getElementsByClassName("ADimg");

// --- special offer ---

// Boxes for the special offers section
let specialOffer = document.getElementById("special_offer");
let specialOfferProducts = document.getElementById("special_offer_products");

// Boxes for the special products timer
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

// =========================
// 2. FUNCTIONS
// =========================

// --- Intro ---

// For changing the style of the slider’s circular buttons and switching slides.
function introBtnClick(num) {
  for (let i = 0; i <= sizeDataIntro; i++) {
    btnIntro[i].classList.remove("active-btn");
  }
  btnIntro[num].classList.add("active-btn");

  sliders.forEach((value) => {
    value.style.left = `${num * 100}%`;
  });
  positionSlides = num;
}

// For changing slides with the left and right buttons.
function RL_slider(direction) {
  if (direction == "R") {
    if (positionSlides == 0) {
      introBtnClick(sizeDataIntro);
    } else {
      introBtnClick(positionSlides - 1);
    }
  }
  if (direction == "L") {
    if (positionSlides == sizeDataIntro) {
      introBtnClick(0);
    } else {
      introBtnClick(positionSlides + 1);
    }
  }
}

// for create intro
function createIntro(data) {
  let dataIntro = data;
  sizeDataIntro = dataIntro.length - 1;

  // For placing the slider image.
  dataIntro.map((value) => {
    slidersBox.innerHTML += `<a href="${value.href}"><img src="${value.img}" alt="${value.alt}" class="sliders img-fluid"></a>`;
  });

  // For get sliders
  // We converted it to an array so we could use forEach on it.
  sliders = Array.from(document.getElementsByClassName("sliders"));

  // For creating circular buttons.
  for (let i = 0; i <= sizeDataIntro; i++) {
    if (i == 0) {
      btnIntroBox.innerHTML = `<div class="btn-intro active-btn"></div>`;
    } else {
      btnIntroBox.innerHTML += `<div class="btn-intro"></div>`;
    }
  }

  // For get circular buttons
  btnIntro = document.getElementsByClassName("btn-intro");

  // Adding click event to circular buttons
  for (let i = 0; i < btnIntro.length; i++) {
    btnIntro[i].addEventListener("click", () => introBtnClick(i));
  }

  // For get for get right and left btn
  rightBtnIntro = document.getElementById("rightBtnIntro");
  leftBtnIntro = document.getElementById("leftBtnIntro");

  // changing slides with the left and right buttons
  rightBtnIntro.addEventListener("click", () => {
    RL_slider("R");
  });
  leftBtnIntro.addEventListener("click", () => {
    RL_slider("L");
  });

  // auto Slider change.
  setInterval(() => {
    if (positionSlides == sizeDataIntro) {
      introBtnClick(0);
    } else {
      introBtnClick(positionSlides + 1);
    }
  }, 10000);
}

// --- Best products ---

// for create Best Products
function createBestProducts(data) {
  let dataBest_products = data.best_products;

  dataBest_products.forEach((value) => {
    if (value.discount === "0") {
      boxBestProducts.innerHTML += `
  <div class=" col-xl-3 col-sm-6 col-12">
    <div class="products-box">
        <div class="img">
            <img src="${value.img}" alt="${value.imgAlt}" class="img-fluid">
        </div>
        <div class="string">
            <span class="title">${value.title}</span>
            <p class="description">${value.description}</p>
        </div>
        <div class="discount discount-off">
            <span class="price"></span>
            <div class="Percentage">
                <span></span>
            </div>
        </div>
        <div class="bottom d-flex justify-content-between align-items-center">
            <span class="price">${englishToPrsian(value.price)}</span>
            <a href="./assets/page/product.html?id=${
              value.id
            }" class="btn-view">مشاهده</a>
        </div>
    </div>
</div>
  `;
    } else {
      boxBestProducts.innerHTML += `
  <div class=" col-xl-3 col-sm-6 col-12">
    <div class="products-box">
        <div class="img">
            <img src="${value.img}" alt="${value.imgAlt}" class="img-fluid">
        </div>
        <div class="string">
            <span class="title">${value.title}</span>
            <p class="description">${value.description}</p>
        </div>
        <div class="discount">
            <span class="price">${englishToPrsian(value.price)}</span>
            <div class="Percentage">
                <span>${englishToPrsian(value.discount)}%</span>
            </div>
        </div>
        <div class="bottom d-flex justify-content-between align-items-center">
            <span class="price">${discountPrice(
              value.price,
              value.discount
            )}</span>
            <a href="./assets/page/product.html?id=${
              value.id
            }" class="btn-view">مشاهده</a>
        </div>
    </div>
</div>
  `;
    }
  });
}

// --- ADs ---
// for creare ADs
function createAD(data) {
  data.ads.forEach((value) => {
    ADimg[
      value.positon
    ].innerHTML = `<a href="${value.href}"><img src="${value.img}" alt="${value.imgAlt}"></a>`;
  });
}

// --- special offer ---

// Creating special offer products
function createSpecialOffer(data) {
  data.Special_offer.forEach((value) => {
    if (value.discount === "0") {
      specialOfferProducts.innerHTML += `
  <div class="card-box">
      <div class="img">
          <img src="${value.img}" alt="${value.imgAlt}" draggable="false">
      </div>
      <div class="title">
          <span>${value.title}</span>
      </div>
      <div class="discount discount-off">
          <span class="discountPrice">.</span>
          <span class="discount">%</span>
      </div>
      <div class="bottom d-flex align-items-center justify-content-between">
          <span class="price">${discountPrice(
            value.price,
            value.discount
          )}</span>
          <div class="btn-view">
              <a href="./assets/page/product.html?id=${value.id}">مشاهده</a>
          </div>
      </div>
  </div>
  `;
    } else {
      specialOfferProducts.innerHTML += `
  <div class="card-box">
      <div class="img">
          <img src="${value.img}" alt="${value.imgAlt}" draggable="false">
      </div>
      <div class="title">
          <span>${value.title}</span>
      </div>
      <div class="discount">
          <span class="discountPrice">${englishToPrsian(value.price)}</span>
          <span class="discount">${englishToPrsian(value.discount)}%</span>
      </div>
      <div class="bottom d-flex align-items-center justify-content-between">
          <span class="price">${discountPrice(
            value.price,
            value.discount
          )}</span>
          <div class="btn-view">
              <a href="./assets/page/product.html?id=${value.id}">مشاهده</a>
          </div>
      </div>
  </div>
  `;
    }
  });
}

// Special products timer
function timer(value) {
  // If the timer is off, special offers should not be displayed
  if (value.Special_offer_timer == "off") {
    specialOffer.classList.add("d-none");
  }

  // If set to automatic mode, it should run infinitely based on the specified time
  else if (value.Special_offer_timer == "auto") {
    // For calculating the remaining time
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(12, 24, 13);
    const dif = targetDate - new Date();

    // If the remaining time is greater than zero:
    if (dif > 0) {
      // Getting exact numbers in hourly format
      const hou = Math.floor(dif / (1000 * 60 * 60));
      const min = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((dif % (1000 * 60)) / 1000);

      // Placing numbers inside a specific box
      hours.innerHTML = englishToPrsian(hou.toString());
      minutes.innerHTML = englishToPrsian(min.toString());
      seconds.innerHTML = englishToPrsian(sec.toString());
    }

    // If the remaining time has passed:
    else {
      // Place zeros in the specified boxes, and after 5 seconds, the special offers will disappear
      hours.innerHTML = englishToPrsian("0");
      minutes.innerHTML = englishToPrsian("0");
      seconds.innerHTML = englishToPrsian("0");

      setTimeout(() => {
        specialOffer.classList.add("d-none");
      }, 5000);
    }
  }

  // If a specific time is set:
  else {
    // For calculating the remaining time
    const targetDate = new Date(value.Special_offer_timer);
    const dif = targetDate - new Date();

    if (dif > 0) {
      // Getting exact numbers in hourly format
      const hou = Math.floor(dif / (1000 * 60 * 60));
      const min = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((dif % (1000 * 60)) / 1000);
      // Placing numbers inside a specific box
      hours.innerHTML = englishToPrsian(hou.toString());
      minutes.innerHTML = englishToPrsian(min.toString());
      seconds.innerHTML = englishToPrsian(sec.toString());
    }
    // If the remaining time has passed:
    else {
      // Place zeros in the specified boxes, and after 5 seconds, the special offers will disappear
      hours.innerHTML = englishToPrsian("0");
      minutes.innerHTML = englishToPrsian("0");
      seconds.innerHTML = englishToPrsian("0");

      setTimeout(() => {
        specialOffer.classList.add("d-none");
      }, 5000);
    }
  }
}

// =========================
// 3. EVENT LISTENERS
// =========================

window.addEventListener("load", async function getData() {
  try {
    const [intrData, homeData] = await Promise.all([
      fetch("https://jsonkeeper.com/b/JOWOV").then((result) => result.json()),
      fetch("https://jsonkeeper.com/b/QZEJL").then((result) => result.json()),
    ]);
    createIntro(intrData);
    createBestProducts(homeData);
    createAD(homeData);
    createSpecialOffer(homeData);
    timer(homeData);
    setInterval(() => {
      timer(homeData);
    }, 1000);
    drag("#special_offer_products");
    slowingLink();

    await waitForImagesToLoad();
    offLoading();
  } catch(err){
    alertError(err);
  }
});
