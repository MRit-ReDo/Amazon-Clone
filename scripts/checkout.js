// import statements
import { 
    products,
    loadProducts,
    findProductByID
} from "./utils/products.js";

import { cart } from "./utils/cart.js";

import { 
    deliveryDates,
    formatToday,
    renderDeliverySelection
} from "./utils/delivery.js";

import { 
    formatCurrency,
    totalDeliveryCharge,
    updateBill
} from "./utils/money.js";

import { 
    orders,
    generateHash,
    Order, 
    loadOrderItems
} from "./utils/order.js";


// rendering functions
const updateNumberOfItems = () => {
    let toatalItems = cart.cartTotal().number;
    document.querySelector(".return-to-home-link").innerHTML = String(toatalItems)+" items";
    document.querySelector(".number-of-items").innerHTML = "Items ("+String(toatalItems)+"):";
}

const renderCheckoutPage = () => {
    let checkoutHTML = "";
    cart.cart.forEach(cartItem => {
        const product = findProductByID(products,cartItem.id);
        checkoutHTML += `
        <div class="cart-item-container cart-item-${product.id}">
            <div class="delivery-date delivery-date-${product.id}">Delivery date: <span>${deliveryDates[2]}</span></div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.image}">
                    <div class="cart-item-details">
                        <div class="product-name product-name-${product.id}">${product.name}</div>
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
    updateBill(0,true);


    // binding event listeners
    document.querySelectorAll(".delivery-option-input").forEach((input) => {
        input.addEventListener("click",() => {
            document.querySelector(".delivery-date-"+input.dataset.id).lastChild.innerHTML = input.dataset.date;
            updateBill(totalDeliveryCharge(),true);
        })
    })

    document.querySelectorAll(".delete-quantity-link").forEach((button) => {
        button.addEventListener("click",() => {
            cart.deleteFromCheckoutPage(button.dataset.id);
            updateNumberOfItems();
            updateBill(totalDeliveryCharge(),true);
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
            cart.saveUpdateFromCheckoutPage(id);
            updateNumberOfItems();
            updateBill(totalDeliveryCharge(),true);
            document.querySelector(".update-quantity-link-"+id).classList.remove("hide");
            document.querySelector(".save-quantity-input-"+id).value = "";
            document.querySelector(".save-quantity-link-"+id).classList.add("hide");
        })
    })

    document.querySelector(".place-order-button").addEventListener("click",() => {
        let orderItems = loadOrderItems();
        const today = formatToday();
        generateHash(today).then((hash) => {
            const orderInformation = {
                id: hash,
                date: today,
                total:formatCurrency(updateBill(totalDeliveryCharge(),false)),
                order: orderItems,
            }
            orders.push(new Order(orderInformation));
            localStorage.setItem("orders",JSON.stringify(orders));
            document.querySelector(".order-summary").innerHTML = "";
            cart.cart = []
            updateNumberOfItems();
            updateBill(0,true);
            cart.updateLocalStorage();
        })
    })
}

loadProducts().then(() => {
    renderCheckoutPage();
});