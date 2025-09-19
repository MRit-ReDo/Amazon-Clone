import { cart } from "./utils/cart.js";
import { orders } from "./utils/order.js";
import { findProductByID, loadProducts, products } from "./utils/products.js";


// rendering functions
const renderOrderItems = (orderItems) => {
    let orderItemsHTML = "";
    orderItems.forEach((orderItem) => {
        const product = findProductByID(products,orderItem.id);
        orderItemsHTML += `
        <div class="product-image-container"><img src="${product.image}"></div>
        <div class="product-details">
            <div class="product-name">${product.name}</div>
            <div class="product-delivery-date">Arriving on: ${orderItem.arriving}</div>
            <div class="product-quantity">Quantity: ${orderItem.quantity}</div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
        </div>
        <div class="product-actions">
            <a href="tracking.html"><button class="track-package-button button-secondary">Track package</button></a>
        </div>
        `
    });
    return orderItemsHTML;
}

const renderOrdersPage = () => {
    document.querySelector(".cart-quantity").innerHTML = cart.cartTotal().number;
    let ordersHTML = "";
    orders.forEach(order => {
        ordersHTML += `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${order.date}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${order.total}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>
            <div class="order-details-grid">${renderOrderItems(order.order)}</div>
        </div>
        `
    });
    document.querySelector(".orders-grid").innerHTML = ordersHTML;
}

loadProducts().then(() => {
    renderOrdersPage();
})
