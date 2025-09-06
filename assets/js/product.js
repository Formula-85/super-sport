// =========================
// IMPORTS
// =========================
import { slowingLink, offLoading, waitForImagesToLoad, englishToPrsian, discountPrice } from "./main.js";

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

// if (value.discount !== "0") {
//       informationProduct.innerHTML = `
//         <h1>${value.title}</h1>
//         <p class="description">${value.description}</p>
//         <div class="discount-box">
//             <div class="price-discount">${englishToPrsian(value.price)}</div>
//             <div class="discount">${englishToPrsian(value.discount)}</div>
//         </div>
//         <div class="bottom">
//             <div class="price">${discountPrice(value.price,value.discount)}</div>
//             <div class="btn-buy">افزودن به سبد خرید</div>
//         </div>
//     `;
// }
// else{
//       informationProduct.innerHTML = `
//         <h1>${value.title}</h1>
//         <p class="description">${value.description}</p>
//         <div class="discount-box offDiscount">
//             <div class="price-discount"></div>
//             <div class="discount"></div>
//         </div>
//         <div class="bottom">
//             <div class="price">${discountPrice(value.price,value.discount)}</div>
//             <div class="btn-buy">افزودن به سبد خرید</div>
//         </div>
//     `;
// }
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
