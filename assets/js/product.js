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

// --- related products ---
let relatedProducts = document.getElementById("related_products-box");
// =========================
// 2. FUNCTIONS
// =========================
// --- Finding Product ---
// Fetching specific product information
function FindingProduct(data) {
  data.forEach((value) => {
    if (value.id == itemID) {
      product = value;
    }
  });
}
// --- breadcrumb ---
// Creating a breadcrumb
function createBreadcrumb(value) {
  breadcrumbCategory.innerHTML = value.category;
  breadcrumbItem.innerHTML = value.title;
}

// --- product ---

// Creating product image and information
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

// Creating the related products section

function creatingRelatedProducts(allProducts, currentProduct) {
  // Finding products similar to, but excluding, the main product
  let related = allProducts.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  );

  // If the number of similar products is less than four, use the remaining products
  if (related.length < 4) {
    const other = allProducts.filter((p) => p.id !== currentProduct.id);
    related = [...related, ...other].filter(
      (p, index, self) => self.findIndex((x) => p.id === x.id) === index
    );
  }

  // Limits the number of products to four
  related = related.slice(0, 4);

  // Creating the similar products section
  related.forEach((value) => {
    if (value.discount !== "0") {
      relatedProducts.innerHTML += `
    <div class="col-3 box">
    <div class="box-product">
      <img src="${value.img}" alt="${value.imgAlt}">
      <div class="information">
        <span class="title">${value.title}</span>
        <p class="description">${value.description}</p>
      </div>
      <div class="discount-box">
        <span class="price-discount">${englishToPrsian(value.price)}</span>
        <div class="discount"><span>${englishToPrsian(
          value.discount
        )}%</span></div>
      </div>
      <div class="bottom">
        <span class="price">${discountPrice(value.price, value.discount)}</span>
        <a href="./product.html?id=${value.id}">مشاهده</a>
      </div>
    </div>
  </div>
  `;
    } else {
      relatedProducts.innerHTML += `
    <div class="col-3 box">
    <div class="box-product">
      <img src="${value.img}" alt="${value.imgAlt}">
      <div class="information">
        <span class="title">${value.title}</span>
        <p class="description">${value.description}</p>
      </div>
      <div class="discount-box off">
        <span class="price-discount"></span>
        <div class="discount"><span>%</span></div>
      </div>
      <div class="bottom">
        <span class="price">${englishToPrsian(value.price)}</span>
        <a href="./product.html?id=${value.id}">مشاهده</a>
      </div>
    </div>
  </div>
  `;
    }
  });
}

// =========================
// 3. EVENT LISTENERS
// =========================

window.addEventListener("load", async function getData() {
  try {
    const [productData] = await Promise.all([
      fetch("https://jsonkeeper.com/b/CFEDX").then((result) => result.json()),
    ]);

    FindingProduct(productData);
    createBreadcrumb(product);
    createProduct(product);
    creatingRelatedProducts(productData, product);

    await waitForImagesToLoad();
    offLoading();

    slowingLink();
  } catch (error) {
    console.log("Error:", error);
  }
});
