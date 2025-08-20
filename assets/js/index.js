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
  link.addEventListener('click', function(e) {
    e.preventDefault(); // جلوگیری از رفتن فوری به لینک

    const href = this.href;

    setTimeout(() => {
      window.location.href = href; // بعد از تاخیر برو به لینک
    }, 700); // ۵۰۰ میلی‌ثانیه تاخیر
  });
});