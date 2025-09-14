// =========================
// IMPORTS
// =========================
import {
  slowingLink,
  offLoading,
  waitForImagesToLoad,
  englishToPrsian,
  discountPrice,
  alertError,
} from "./main.js";

// =========================
// 1. VARIABLES
// =========================
// --- url and id and item---
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

// --- breadcrumb ---
let breadcrumbCategory = document.getElementById("breadcrumb-category");
let breadcrumbItem = document.getElementById("breadcrumb-item");

//  --- product ---
let product;
let productImg = document.getElementById("img-product");
let informationProduct = document.getElementById("information-product");

// --- related products ---
let relatedProducts = document.getElementById("related_products-box");

// --- comments ---
const commentsBox = document.getElementById("commentsBox");
// =========================
// 2. FUNCTIONS
// =========================
// --- Finding Product ---
// Fetching specific product information
function findingProduct(data) {
  data.forEach((value) => {
    if (value.id == itemId) {
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
          <h2 class="title">ویژگی های محصول :</h2>
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
          <div class="price">قیمت : ${discountPrice(
            value.price,
            value.discount
          )}</div>
          <a href="">افزودن به سبد خرید</a>
        </div>
    `;
  } else {
    informationProduct.innerHTML = `
        <h1>${value.title}</h1>
        <p class="description">${value.description}</p>
        <div class="features">
          <h2 class="title">ویژگی های محصول :</h2>
          <ul>
          ${value.features
            .map((result) => {
              return `<li>${result}</li>`;
            })
            .join("")}
          </ul>
        </div>
        <div class="discount-box d-none">
          <div class="price-discount">0</div>
          <div class="discount"><span>%</span></div>
        </div>
        <div class="bottom d-flex justify-content-between">
          <div class="price">قیمت : ${discountPrice(
            value.price,
            value.discount
          )}</div>
          <a href="#">افزودن به سبد خرید</a>
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
    <div class="col-lg-3 col-6 box">
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
    <div class="col-lg-3 col-6 box">
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

// --- comments ---
function createCommenst(commentsData, usersData) {
  if (commentsData) {
    commentsData.forEach((value) => {
      const user = usersData.find((user) => user.id == value.userId);
      console.log(value);
      commentsBox.innerHTML += `
            <div class="comment">
          <img src="${user.img}" alt="پروفایل">
          <div class="information">
            <div class="userInformation">
              <h4>${user.userName}</h4>
              <span class="date">${
                englishToPrsian(value.date.year).replace(",", "") +
                "/" +
                englishToPrsian(value.date.month) +
                "/" +
                englishToPrsian(value.date.day)
              }</span>
            </div>
            <p class="comment-text">${value.commentText}</p>
              <button class="btn-text-veiw">مشاهده همه</button>
              ${
                value.consent === true
                  ? `<span class="bid true">خرید این محصول رو پیشنهاد میکنم</span>`
                  : `<span class="bid false">خرید این محصول رو پیشنهاد نمیکنم</span>`
              }
          </div>
        </div>`;
    });

    const commentTexts = document.getElementsByClassName("comment-text");
    const commentTextBtns = document.getElementsByClassName("btn-text-veiw");
    let openComment = [];

    for (let i = 0; i < commentTextBtns.length; i++) {
      openComment.push(false);
      commentTextBtns[i].addEventListener("click", () => {
        if (!openComment[i]) {
          commentTexts[i].classList.add("comment-text-open");
          commentTextBtns[i].innerHTML = "دیدن کمتر";
          openComment[i] = true;
        } else {
          commentTexts[i].classList.remove("comment-text-open");
          commentTextBtns[i].innerHTML = "مشاهده همه";
          openComment[i] = false;
        }
      });

      if (commentTexts[i].scrollWidth <= commentTexts[i].clientWidth) {
        commentTextBtns[i].classList.add("d-none");
      }
    }
  } else {
    commentsBox.innerHTML = `
        <div class="comment off">
          <h3>هنوز نظری وجود ندارد</h3>
        </div>`;
  }
}

// =========================
// 3. EVENT LISTENERS
// =========================

window.addEventListener("load", async function getData() {
  try {
    const productData = await fetch("https://jsonkeeper.com/b/CFEDX").then(
      (result) => result.json()
    );

    findingProduct(productData.product);
    createBreadcrumb(product);
    createProduct(product);
    creatingRelatedProducts(productData.product, product);
    createCommenst(product.comments, productData.user);

    await waitForImagesToLoad();
    offLoading();

    slowingLink();
  } catch (err) {
    alertError(err);
  }
});
