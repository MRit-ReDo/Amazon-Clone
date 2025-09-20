// import statements
import { cart } from "./utils/cart.js";

import { subtractDates } from "./utils/delivery.js";

import {
    products,
    loadProducts,
    findProductByID
} from "./utils/products.js";


// rendering functions
const renderProgressStatus = (progress) => {
    let progressHTML = "";
    const progressStates = ["Preparing","Shipped","Delivered"];
    for (let i = 0; i < 3; i++) {
        if (progress === i) {
            progressHTML += `<div class="progress-label current-status">${progressStates[i]}</div>`;
        }
        else {
            progressHTML += `<div class="progress-label">${progressStates[i]}</div>`;
        }
    }
    return progressHTML;
}

const renderTrackingPage = () => {
    document.querySelector(".cart-quantity").innerHTML = cart.cartTotal().number;
    const url = new URL(window.location.href);
    const product = findProductByID(products,url.searchParams.get("id"));
    const progress = subtractDates(url.searchParams.get("ar"));
    const trackingHTML = `
    <div class="delivery-date">Arriving on ${url.searchParams.get("ar")}</div>
    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${url.searchParams.get("q")}</div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">${renderProgressStatus(progress[1])}</div>
    <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progress[0]}%"></div>
    </div>
    `
    document.querySelector(".seperator").innerHTML = trackingHTML;
}

loadProducts().then(() => {
    renderTrackingPage();
    renderProgressStatus(0);
})