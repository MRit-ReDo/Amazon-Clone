import { 
    cart,
    deleteFromCheckoutPage,
    findProductByID,
    saveUpdateFromCheckoutPage,
} from "./utils/cart.js";

import { 
    deliveryDates,
    renderDeliverySelection
} from "./utils/delivery.js";

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
            <div class="delivery-date delivery-date-${product.id}">Delivery date: ${deliveryDates[0]}</div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.image}">
                    <div class="cart-item-details">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${formatCurrency(product.priceCents)}</div>
                        <div class="product-quantity">
                            <span>Quantity: <span class="quantity-label-${product.id}">${cartItem.qty}</span></span>
                            <span class="update-quantity-link link-primary update-quantity-link-${product.id}" data-id="${product.id}">Update</span>
                            <span class="save-quantity-link link-primary save-quantity-link-${product.id} hide" data-id="${product.id}">
                                <input type="text" class="save-quantity-input save-quantity-input-${product.id}" placeholder="1-100" style="width: 40px">
                                <span class="save-quantity-button save-quantity-button-${product.id}" data-id="${product.id}">Save</span>
                            </span>
                            <span class="delete-quantity-link link-primary" data-id="${product.id}">Delete</span>
                        </div>
                    </div>
                    <div class="delivery-options">${renderDeliverySelection(product.id)}</div>
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

document.querySelectorAll(".update-quantity-link").forEach((button) => {
    button.addEventListener("click",() => {
        const id = button.dataset.id;
        document.querySelector(".update-quantity-link-"+id).classList.add("hide");
        document.querySelector(".save-quantity-link-"+id).classList.remove("hide");
    })
})

document.querySelectorAll(".save-quantity-button").forEach((button) => {
    button.addEventListener("click",() => {
        const id = button.dataset.id;
        saveUpdateFromCheckoutPage(id);
        updateNumberOfItems();
        updateBill(totalDeliveryCharge());
        document.querySelector(".update-quantity-link-"+id).classList.remove("hide");
        document.querySelector(".save-quantity-input-"+id).value = "";
        document.querySelector(".save-quantity-link-"+id).classList.add("hide");
    })
})