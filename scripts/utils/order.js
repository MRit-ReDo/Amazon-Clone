// importi statements
import { cart } from "./cart.js";


// defining classes
class OrderItem {
    name;
    quantity;
    arriving;

    constructor(orderItemDetails) {
        this.id = orderItemDetails.id;
        this.quantity = orderItemDetails.quantity;
        this.arriving = orderItemDetails.arriving;
    }
}

class Order {
    id;
    date;
    total;
    order;

    constructor(orderInformation) {
        this.id = orderInformation.id;
        this.date = orderInformation.date;
        this.total = orderInformation.total;
        this.order = orderInformation.order;
    }
}


// defining variables
let orders = JSON.parse(localStorage.getItem("orders")) || [];


//defining helper funcitons
async function generateHash(input){
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex.slice(0,6)+"-"+hashHex.slice(6,10)+"-"+hashHex.slice(11,15)+"-"+hashHex.slice(16,20)+"-"+hashHex.slice(20,32);
}

const loadOrderItems = () => {
    let orderItems = [];
    cart.cart.forEach((cartItem) => {
        const id = cartItem.id;
        const orderItemDetails = {
            id: id,
            quantity: cartItem.qty,
            arriving: document.querySelector(".delivery-date-"+id).lastChild.innerHTML,
        }
        orderItems.push(new OrderItem(orderItemDetails))
    });
    return orderItems;
}


// listing exports
export {
    OrderItem,
    Order,
    orders,
    generateHash,
    loadOrderItems,
}

