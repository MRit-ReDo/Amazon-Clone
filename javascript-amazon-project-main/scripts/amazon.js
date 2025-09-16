import { products } from "../data/products.js";
import { cart, cartTotal } from "./cart.js";

const renderProducts = () => {
    var productHTML = "";
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
            <div class="product-price">$${product.priceCents/100}</div>
            <div class="product-quantity-container">
                <select class="select-${product.id}">
                    <option selected value="1">1</option><option value="2">2</option><option value="3">3</option>
                    <option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option>
                    <option value="8">8</option><option value="9">9</option><option value="10">10</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart added-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">Add to Cart</button>
        </div>
        `
    });
    document.querySelector(".products-grid").innerHTML = productHTML;
    document.querySelector(".cart-quantity").innerHTML = cartTotal();
}

renderProducts();

document.querySelectorAll(".add-to-cart-button").forEach(button => {
    button.addEventListener("click",(event) => {
        clearTimeout();
        event.stopPropagation();
        const id = button.dataset.productId;
        const toAdd = Number(document.querySelector(".select-"+id).value);
        var total = 0;
        var match;
        cart.forEach(item => {
            if (item.pid === id) {
                match = item;
            }
            total += item.qty;
        });
        if (match) {
            match.qty += toAdd;
        }
        else {
            const cartItem = {
                pid: id,
                qty: toAdd
            }
            cart.push(cartItem);
        }
        document.querySelector(".cart-quantity").innerHTML = total+toAdd;
        localStorage.setItem("cart1",JSON.stringify(cart));
        document.querySelector(".added-"+id).classList.add("visible");
        setTimeout(() => {
            document.querySelector(".added-"+id).classList.remove("visible");
        },2000);
    });
})
