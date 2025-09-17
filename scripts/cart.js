let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateCart = () => {
    var totalItems = 0;
    cart.forEach(item => {
        totalItems += item.qty;
    });
    document.querySelector(".cart-quantity").innerHTML = totalItems;
}

const displayAddedToCartMessage = (id) => {
    document.querySelector(".added-"+id).classList.add("visible");
    setTimeout(() => {
        document.querySelector(".added-"+id).classList.remove("visible");
    },2000);
}

const addProductsToCart = (id) => {
    const toAdd = Number(document.querySelector(".select-"+id).value);
    var match;
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
    localStorage.setItem("cart",JSON.stringify(cart));
}

export {cart,updateCart,displayAddedToCartMessage,addProductsToCart};