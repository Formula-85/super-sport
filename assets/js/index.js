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

// burger menu

let burger = document.getElementById("burger");
let burgerBox = document.getElementById("burger-box");
let openBurgerBox = false;

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

// Dropdown in burger menu
let burgerDropdown = document.getElementById("burger-dropdown");
let burgerDropdownBox = document.getElementById("burger-dropdown-box");

let openBurgerDropdown = false;

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




// intro slider

// this for data 
let dataIntro
let sizeDataIntro;

// this for small circles at the bottom of the slides
let btnIntoBox = document.getElementById("btns-intro");
let btnIntro;

// In order: for accessing the element that contains the slides, the slides themselves, and the slide position.
let slidersBox = document.getElementById("boxSlider");
let sliders;
let positionSlides = 0;

// for right and left btn
let rightBtnIntro;
let leftBtnIntro;


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

// Getting intro information.
fetch("https://jsonkeeper.com/b/JOWOV")
  .then((result) => {
    return result.json();
  })
  .then((data) => {

    dataIntro = data;
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
        btnIntoBox.innerHTML = `<div class="btn-intro active-btn" onclick="introBtnClick(0)"></div>`;
      } else {
        btnIntoBox.innerHTML += `<div class="btn-intro" onclick="introBtnClick(${i})"></div>`;
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

  })
  .catch((error) => {
    console.error(error);
    alert("مشکلی در بار گذاری، لطفا بعدا دوباره تلاش کنید")
  })


// auto Slider change.
setInterval(() => {
  if (positionSlides == sizeDataIntro) {
    introBtnClick(0);
  } else {
    introBtnClick(positionSlides + 1);
  }
}, 10000);

