import { products } from "../../data/products.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateLocalStorage = (item,info) => {
    localStorage.setItem(item,JSON.stringify(info));
}

const updateCart = () => {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.qty;
    });
    document.querySelector(".cart-quantity").innerHTML = totalItems;
    return totalItems;
}

const displayAddedToCartMessage = (id) => {
    document.querySelector(".added-"+id).classList.add("visible");
    setTimeout(() => {
        document.querySelector(".added-"+id).classList.remove("visible");
    },2000);
}

const findProductByID = (id) => {
    let match;
    products.forEach(product => {
        if (product.id === id) {
            match = product;
        }
    });
    return match;
}

const cartTotal = () => {
    let total = 0;
    cart.forEach(cartItem => {
        const product = findProductByID(cartItem.pid);
        total += product.priceCents*cartItem.qty;
    });
    return total;
}

const addProductsToCart = (id) => {
    const toAdd = Number(document.querySelector(".select-"+id).value);
    let match;
    cart.forEach(item => {
        if (item.pid === id) {
            match = item;
        }
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
    updateLocalStorage("cart",cart);
    document.querySelector(".select-"+id).value = 1;
}

const deleteFromCheckoutPage = (id) => {
    cart = cart.filter((cartItem) => {
        return cartItem.pid !== id;
    })
    updateLocalStorage("cart",cart);
    document.querySelector(".cart-item-"+id).remove();
}

const saveUpdateFromCheckoutPage = (id) => {
    const value = Number(document.querySelector(".save-quantity-input-"+id).value);
    if (value > 0 && value <= 100) {
        let match;
        cart.forEach(item => {
            if (item.pid === id) {
                match = item;
            }
        });
        match.qty = value;
        updateLocalStorage("cart",cart);
        document.querySelector(".quantity-label-"+id).innerHTML = value;
    }
}

export {
    cart,
    updateCart,
    displayAddedToCartMessage,
    findProductByID,cartTotal,
    addProductsToCart,
    deleteFromCheckoutPage,
    saveUpdateFromCheckoutPage,
};