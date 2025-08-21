let burger = document.getElementById("burger")
let burgerBox = document.getElementById("burger-box")

let openBurgerBox = false


burger.addEventListener("click", () => {
  if (openBurgerBox) {
    openBurgerBox = false
    burgerBox.style = ""
  }
  else {
    openBurgerBox = true
    burgerBox.style.right = "0%"
  }
})


let burgerDropdown = document.getElementById("burger-dropdown")
let burgerDropdownBox = document.getElementById("burger-dropdown-box")

let openBurgerDropdown = false


burgerDropdown.addEventListener("click", () => {
  if (openBurgerDropdown) {
    openBurgerDropdown = false
    burgerDropdownBox.style.height = ""
  }
  else {
    openBurgerDropdown = true
    burgerDropdownBox.style.height = burgerDropdownBox.scrollHeight + "px"
  }
})


document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // جلوگیری از رفتن فوری به لینک

    const href = this.href;

    setTimeout(() => {
      window.location.href = href; // بعد از تاخیر برو به لینک
    }, 700); // ۵۰۰ میلی‌ثانیه تاخیر
  });
});


let btnIntro = document.getElementsByClassName("btn-intro")

let sliders = Array.from(document.getElementsByClassName("sliders"))
let positionSlides = 0



function introBtnClick(num) {
  for (let i = 0; i < 3; i++) {
    btnIntro[i].classList.remove("active-btn")
  }
  btnIntro[num].classList.add("active-btn")

  if (num == 0) {
    sliders.forEach((value) => {
      value.style.left = "0%"
    })
    positionSlides = 0
  }
  else if (num == 1) {
    sliders.forEach((value) => {
      value.style.left = "100%"
    })
    positionSlides = 1
  }
  else {
    sliders.forEach((value) => {
      value.style.left = "200%"
    })
    positionSlides = 2
  }
}



setInterval(() => {
  if (positionSlides == 0) {
    sliders.forEach((value) => {
      value.style.left = "100%"
    })
    introBtnClick(1)
  }
  else if (positionSlides == 1) {
    sliders.forEach((value) => {
      value.style.left = "200%"
    })
    introBtnClick(2)
  }
  else {
    sliders.forEach((value) => {
      value.style.left = "0%"
    })
    introBtnClick(0)
  }
}, 8000);



