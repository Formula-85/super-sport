// =========================
// IMPORTS
// =========================
import {
  slowingLink,
  offLoading,
  waitForImagesToLoad,
  englishToPrsian,
  discountPrice,
} from "./main.js";

// =========================
// 1. VARIABLES
// =========================
// --- url and id and item---
const urlParams = new URLSearchParams(window.location.search);
const itemID = urlParams.get("id");

// --- breadcrumb ---
let breadcrumbCategory = document.getElementById("breadcrumb-category");
let breadcrumbItem = document.getElementById("breadcrumb-item");

//  --- product ---
let product;
let productImg = document.getElementById("img-product");
let informationProduct = document.getElementById("information-product");
// =========================
// 2. FUNCTIONS
// =========================

// --- breadcrumb ---
function foundFindingProduct(data) {
  data.forEach((value) => {
    if (value.id == itemID) {
      product = value;
    }
  });
}
function createBreadcrumb(value) {
  breadcrumbCategory.innerHTML = value.category;
  breadcrumbItem.innerHTML = value.title;
}

// --- product ---

function createProduct(value) {
  productImg.innerHTML = `<img src="${value.img}" alt="${value.imgAlt}" draggable="false">`;

  if (value.discount !== "0") {
    informationProduct.innerHTML = `
        <h1>${value.title}</h1>
        <p class="description">${value.description}</p>
        <div class="features">
          <span class="title">ویژگی های محصول :</span>
          <ul>
          ${value.features
            .map((result) => {
              return `<li>${result}</li>`;
            })
            .join("")}
          </ul>
        </div>
        <div class="discount-box d-flex">
          <div class="price-discount">${englishToPrsian(value.price)}</div>
          <div class="discount"><span>${englishToPrsian(
            value.discount
          )}%</span></div>
        </div>
        <div class="bottom d-flex justify-content-between">
          <div class="price">${discountPrice(value.price, value.discount)}</div>
          <button>افزودن به سبد خرید</button>
        </div>
    `;
  } else {
    informationProduct.innerHTML = `
        <h1>${value.title}</h1>
        <p class="description">${value.description}</p>
        <div class="features">
          <span class="title">ویژگی های محصول :</span>
          <ul>
          ${value.features
            .map((result) => {
              return `<li>${result}</li>`;
            })
            .join("")}
          </ul>
        </div>
        <div class="discount-box d-flex offDiscount">
          <div class="price-discount">${englishToPrsian(value.price)}</div>
          <div class="discount"><span>${englishToPrsian(
            value.discount
          )}%</span></div>
        </div>
        <div class="bottom d-flex justify-content-between">
          <div class="price">${discountPrice(value.price, value.discount)}</div>
          <button>افزودن به سبد خرید</button>
        </div>
    `;
  }
}

// =========================
// 3. EVENT LISTENERS
// =========================

window.addEventListener("load", async function getData() {
  try {
    const [productData] = await Promise.all([
      fetch("https://jsonkeeper.com/b/CFEDX").then((result) => result.json()),
    ]);

    foundFindingProduct(productData);
    createBreadcrumb(product);
    createProduct(product);

    await waitForImagesToLoad();
    offLoading();

    slowingLink();
  } catch (error) {
    console.log("Error:", error);
  }
});
