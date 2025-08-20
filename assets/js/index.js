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
