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
let boxBestProducts = document.getElementById("boxBestProducts")



// --- ADs ---
let ADimg = document.getElementsByClassName("ADimg")



// --- loading ---
let loading = document.getElementById("loading")
let body = document.getElementById("body")

// --- special offer ---

let specialOffer = document.getElementById("special_offer")
let specialOfferProducts = document.getElementById("special_offer_products")

let hours = document.getElementById("hours")
let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")


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
  let dataIntro = data
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
      btnIntroBox.innerHTML = `<div class="btn-intro active-btn" onclick="introBtnClick(0)"></div>`;
    } else {
      btnIntroBox.innerHTML += `<div class="btn-intro" onclick="introBtnClick(${i})"></div>`;
    }
  }

  // For get circular buttons
  btnIntro = document.getElementsByClassName("btn-intro");



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

// Convert Persian Numbers to English and Separate Numbers by Thousands
function englishToPrsian(value) {
  let num = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return num.replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[d])
}

// For Discount Calculation
function discountPrice(priceNum, discountNum) {
  let discount = discountNum.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
  discount = parseInt(discount)
  let price = priceNum.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
  price = parseInt(price.replace(/,/g, ""));
  let finalprice = price - (price * (discount / 100))
  finalprice = finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  finalprice = finalprice.replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[d])
  return finalprice
}


// for create Best Products
function createBestProducts(data) {
  let dataBest_products = data.best_products

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
            <a href="${value.href}" class="btn-view">مشاهده</a>
        </div>
    </div>
</div>
  `
    }
    else {
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
            <span class="price">${discountPrice(value.price, value.discount)}</span>
            <a href="${value.href}" class="btn-view">مشاهده</a>
        </div>
    </div>
</div>
  `
    }
  })
}


// --- ADs ---
// for creare ADs
function createAD(data) {
  data.ads.forEach((value) => {
    ADimg[value.positon].innerHTML = `<a href="${value.href}"><img src="${value.img}" alt="${value.imgAlt}"></a>`
  })
}

// --- loading ---

function waitForImagesToLoad() {
  const images = Array.from(document.querySelectorAll("img"))
  return Promise.all(images.map(img => {
    return new Promise(resolve => {
      if (img.complete) {
        resolve()
      }
      else {
        img.onload = img.onerror = resolve;
      }
    })
  }))
}

function offLoading() {
  loading.classList.add("aiLoading")
  setTimeout(() => {
    loading.classList.add("offLoading")
    body.classList.remove("overflow-hidden")
  }, 250);
}

// --- special offer ---

function createSpecialOffer(data) {
  data.Special_offer.forEach(value => {
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
          <span class="discountPrice">}</span>
          <span class="discount">}%</span>
      </div>
      <div class="bottom d-flex align-items-center justify-content-between">
          <span class="price">${discountPrice(value.price, value.discount)}</span>
          <div class="btn-view">
              <a href="#">مشاهده</a>
          </div>
      </div>
  </div>
  `
    }
    else {
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
          <span class="price">${discountPrice(value.price, value.discount)}</span>
          <div class="btn-view">
              <a href="#">مشاهده</a>
          </div>
      </div>
  </div>
  `
    }
  });
}

function timer(value) {
  if (value.Special_offer_timer == "off") {
    specialOffer.classList.add("d-none")
  }
  else if (value.Special_offer_timer == "auto") {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1)
    targetDate.setHours(12, 24, 13)

    const dif = targetDate - new Date()

    if (dif > 0) {
      const hou = Math.floor(dif / (1000 * 60 * 60));
      const min = Math.floor((dif % (1000 * 60 * 60) / (1000 * 60)));
      const sec = Math.floor((dif % (1000 * 60)) / 1000);

      hours.innerHTML = englishToPrsian(hou.toString())
      minutes.innerHTML = englishToPrsian(min.toString())
      seconds.innerHTML = englishToPrsian(sec.toString())
    }
    else {
      hours.innerHTML = englishToPrsian("0")
      minutes.innerHTML = englishToPrsian("0")
      seconds.innerHTML = englishToPrsian("0")

      setTimeout(() => {
        specialOffer.classList.add("d-none")
      }, 5000);
    }
  }
  else {
    const targetDate = new Date(value.Special_offer_timer);

    const dif = targetDate - new Date()

    if (dif > 0) {
      const hou = Math.floor(dif / (1000 * 60 * 60));
      const min = Math.floor((dif % (1000 * 60 * 60) / (1000 * 60)));
      const sec = Math.floor((dif % (1000 * 60)) / 1000);

      hours.innerHTML = englishToPrsian(hou.toString())
      minutes.innerHTML = englishToPrsian(min.toString())
      seconds.innerHTML = englishToPrsian(sec.toString())
    }
    else {
      hours.innerHTML = englishToPrsian("0")
      minutes.innerHTML = englishToPrsian("0")
      seconds.innerHTML = englishToPrsian("0")

      setTimeout(() => {
        specialOffer.classList.add("d-none")
      }, 5000);
    }
  }
}


// --- drag ---

function drag(value) {
  const slider = document.querySelector(value)

  let isDown = false
  let startX 
  let scrollLeft


  slider.addEventListener("mousedown" , e => {
    isDown = true
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft;
  })
  slider.addEventListener("mouseup",() => {
    isDown = false
  })
  slider.addEventListener("mouseleave",() => {
    isDown = false
  })
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault()
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 1
    slider.scrollLeft = scrollLeft - walk
  })
}



// =========================
// 3. EVENT LISTENERS
// =========================

// --- tag a---
// Slowing down link execution to fix animation issues on touch screens.
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.href;

    setTimeout(() => {
      window.location.href = href;
    }, 700);
  });
});


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


window.addEventListener("load", async function getData() {
  try {
    const [intrData, homeData] = await Promise.all([
      fetch("https://jsonkeeper.com/b/JOWOV").then(result => result.json()),
      fetch("https://jsonkeeper.com/b/QZEJL").then(result => result.json())
    ]);

    createIntro(intrData)
    createBestProducts(homeData)
    createAD(homeData)
    createSpecialOffer(homeData)
    timer(homeData)
    setInterval(() => {
      timer(homeData)
    }, 1000);
    drag("#special_offer_products")



    await waitForImagesToLoad()
    offLoading()
  } catch {
    console.log("error");
  }
})







