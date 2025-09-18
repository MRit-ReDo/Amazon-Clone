// import statements
import { products } from "../../data/products.js";


// defining variables
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// defining helper functions
const updateLocalStorage = (item,info) => {
    localStorage.setItem(item,JSON.stringify(info));
}

const findProductByID = (array,id) => {
    let index = null;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
            index = i;
        }
    }
    return array[index];
}

const cartTotal = () => {
    let totalValue = 0;
    let totalItems = 0;
    cart.forEach(cartItem => {
        const product = findProductByID(products,cartItem.id);
        totalValue += product.priceCents*cartItem.qty;
        totalItems += cartItem.qty;
    });
    return {
        value: totalValue,
        number: totalItems
    };
}

const deleteFromCheckoutPage = (id) => {
    cart = cart.filter((cartItem) => {
        return cartItem.id !== id;
    })
    updateLocalStorage("cart",cart);
    document.querySelector(".cart-item-"+id).remove();
}

const saveUpdateFromCheckoutPage = (id) => {
    const value = Number(document.querySelector(".save-quantity-input-"+id).value);
    if (value > 0 && value <= 100) {
        let match;
        cart.forEach(item => {
            if (item.id === id) {
                match = item;
            }
        });
        match.qty = value;
        updateLocalStorage("cart",cart);
        document.querySelector(".quantity-label-"+id).innerHTML = value;
    }
}


// rendering functions
const displayAddedToCartMessage = (id) => {
    document.querySelector(".added-"+id).classList.add("visible");
    setTimeout(() => {
        document.querySelector(".added-"+id).classList.remove("visible");
    },2000);
}

const addProductsToCart = (id) => {
    const toAdd = Number(document.querySelector(".select-"+id).value);
    const match = findProductByID(cart,id);
    if (match) {
        match.qty += toAdd;
    }
    else {
        const cartItem = {
            id: id,
            qty: toAdd
        }
        cart.push(cartItem);
    }
    updateLocalStorage("cart",cart);
    document.querySelector(".select-"+id).value = 1;
}


// listing exports
export {
    cart,
    findProductByID,
    cartTotal,
    deleteFromCheckoutPage,
    saveUpdateFromCheckoutPage,
    displayAddedToCartMessage,
    addProductsToCart,
};