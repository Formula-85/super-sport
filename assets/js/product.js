// =========================
// IMPORTS
// =========================
import { 
    slowingLink,
    offLoading,
    waitForImagesToLoad
 } from "./main.js";

// =========================
// 1. VARIABLES
// =========================
// --- url and id and item---
const urlParams = new URLSearchParams(window.location.search)
const itemID = urlParams.get("id")
let product
// --- breadcrumb ---
let breadcrumbCategory = document.getElementById("breadcrumb-category")
let breadcrumbItem = document.getElementById("breadcrumb-item")

// =========================
// 2. FUNCTIONS
// =========================

// --- breadcrumb ---
function foundFindingProduct(data) {
    data.forEach((value) => {
        if (value.id == itemID) {
            product = value
        }
    })
}
function createBreadcrumb(value) {
    breadcrumbCategory.innerHTML = value.category
    breadcrumbItem.innerHTML = value.title
}

// =========================
// 3. EVENT LISTENERS
// =========================

window.addEventListener("load" , async function getData() {
    try{
        const [productData] = await Promise.all([
            fetch("https://jsonkeeper.com/b/CFEDX").then((result) => result.json())
        ])

        foundFindingProduct(productData)
        createBreadcrumb(product)


        await waitForImagesToLoad()
        offLoading()

        slowingLink()

    }catch (error) {
        console.log("Error:", error);
    }
})