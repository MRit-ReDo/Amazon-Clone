// import statements
import { products } from "../data/products.js";

import { 
    displayAddedToCartMessage,
    addProductsToCart,
    cartTotal
} from "./utils/cart.js";

import { formatCurrency } from "./utils/money.js"


// rendering functions
const renderProductsPage = () => {
    let productHTML = "";
    products.forEach(product => {
        productHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-name limit-text-to-2-lines">${product.name}</div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars*10}.png">
                <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
            <div class="product-price">$${formatCurrency(product.priceCents)}</div>
            <div class="product-quantity-container">
                <select class="select-${product.id}">
                    <option selected value="1">1</option><option value="2">2</option><option value="3">3</option>
                    <option value="4">4</option><option value="5">5</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart added-${product.id}">
                <img src="images/icons/checkmark.png">Added
            </div>
            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">Add to Cart</button>
        </div>
        `
    });
    document.querySelector(".products-grid").innerHTML = productHTML;
    document.querySelector(".cart-quantity").innerHTML = cartTotal().number;
}

renderProductsPage();


// binding event listeners
document.addEventListener("DOMContentLoaded",() => {
    document.querySelectorAll(".add-to-cart-button").forEach(button => {
        button.addEventListener("click",() => {
            clearTimeout();
            const id = button.dataset.productId;
            addProductsToCart(id);
            document.querySelector(".cart-quantity").innerHTML = cartTotal().number;
            displayAddedToCartMessage(id);
        });
    })
})


