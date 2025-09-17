import { 
    cart,
    deleteFromCheckoutPage,
    findProductByID,
    cartTotal
} from "./utils/cart.js";
import { 
    formatCurrency,
    totalDeliveryCharge,
    updateBill
} from "./utils/money.js";

const updateNumberOfItems = () => {
    let toatalItems = 0;
    cart.forEach(cartItem => {
        toatalItems += cartItem.qty;
    });
    document.querySelector(".return-to-home-link").innerHTML = String(toatalItems)+" items";
    document.querySelector(".number-of-items").innerHTML = "Items ("+String(toatalItems)+"):";
}

const renderCheckoutPage = () => {
    let checkoutHTML = "";
    cart.forEach(cartItem => {
        const product = findProductByID(cartItem.pid);
        checkoutHTML += `
        <div class="cart-item-container cart-item-${product.id}">
            <div class="delivery-date delivery-date-${product.id}">Delivery date: Tuesday, June 21</div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.image}">
                    <div class="cart-item-details">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${formatCurrency(product.priceCents)}</div>
                        <div class="product-quantity">
                            <span>Quantity: <span class="quantity-label">${cartItem.qty}</span></span>
                            <span class="update-quantity-link link-primary" data-id="${product.id}">Update</span>
                            <span class="delete-quantity-link link-primary" data-id="${product.id}">Delete</span>
                        </div>
                    </div>
                    <div class="delivery-options">
                    <div class="delivery-options-title">Choose a delivery option:</div>
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="delivery-option-${product.id}"
                        data-date="Tuesday, June 21" data-charge="0" data-id="${product.id}">
                        <div>
                            <div class="delivery-option-date">Tuesday, June 21</div>
                            <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}"
                        data-date="Wednesday, June 15" data-charge="499" data-id="${product.id}">
                        <div>
                            <div class="delivery-option-date">Wednesday, June 15</div>
                            <div class="delivery-option-price">$4.99 - Shipping</div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}"
                        data-date="Monday, June 13" data-charge="999" data-id="${product.id}">
                        <div>
                            <div class="delivery-option-date">Monday, June 13</div>
                            <div class="delivery-option-price">$9.99 - Shipping</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    document.querySelector(".order-summary").innerHTML = checkoutHTML;
    updateNumberOfItems();
    updateBill(0);
}

renderCheckoutPage();

document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("click",() => {
        document.querySelector(".delivery-date-"+input.dataset.id).innerHTML = "Delivery date: "+input.dataset.date;
        updateBill(totalDeliveryCharge());
    })
})

document.querySelectorAll(".delete-quantity-link").forEach((button) => {
    button.addEventListener("click",() => {
        deleteFromCheckoutPage(button.dataset.id);
        updateNumberOfItems();
        updateBill(totalDeliveryCharge());
    })
})
