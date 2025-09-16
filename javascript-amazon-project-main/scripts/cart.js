let cart = JSON.parse(localStorage.getItem("cart1")) || [];

const cartTotal = () => {
    var totalItems = 0;
    cart.forEach(item => {
        totalItems += item.qty;
    });
    return totalItems;
}


export {cart,cartTotal};