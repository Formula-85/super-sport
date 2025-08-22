
// Slowing down link execution to fix animation issues on touch screens.

document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.href;

    setTimeout(() => {
      window.location.href = href;
    }, 700);
  });
});




// burger menu

let burger = document.getElementById("burger")
let burgerBox = document.getElementById("burger-box")
let openBurgerBox = false

// open burger menu
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


// Dropdown in burger menu
let burgerDropdown = document.getElementById("burger-dropdown")
let burgerDropdownBox = document.getElementById("burger-dropdown-box")

let openBurgerDropdown = false

// open Dropdown in burger menu
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


// intro slider

let rightBtnIntro = document.getElementById("rightBtnIntro")
let leftBtnIntro = document.getElementById("leftBtnIntro")


let btnIntro = document.getElementsByClassName("btn-intro")

let sliders = Array.from(document.getElementsByClassName("sliders"))
let positionSlides = 0



// Slider change button.

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


// Slider R or L button.
function RL_slider(direction) {
  console.log("HI");
  
  if (direction == "R") {
    if(positionSlides == 0){
      introBtnClick(2)
    }
    else if(positionSlides == 1){
      introBtnClick(0)
    }
    else{
      introBtnClick(1)
    }
  }
  if (direction == "L") {
    if(positionSlides == 0){
      introBtnClick(1)
    }
    else if(positionSlides == 1){
      introBtnClick(2)
    }
    else{
      introBtnClick(0)
    }
  }
}

rightBtnIntro.addEventListener("click",() => {
  RL_slider("R")
})
leftBtnIntro.addEventListener("click",() => {
  RL_slider("L")
})

// auto Slider change.
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
}, 10000);



