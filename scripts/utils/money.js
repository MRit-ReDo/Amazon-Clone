// import statements
import { cart } from "./cart.js";


// defining helper functions
const formatCurrency = (amt) => {
    return (amt/100).toFixed(2);
}

const calculateTax = (amt) => {
    return (amt*0.1);
}

const totalDeliveryCharge = () => {
    let totalCharge = 0;
    document.querySelectorAll(".delivery-option-input").forEach((input) => {
        if (input.checked) {
            totalCharge += Number(input.dataset.charge);
        }
    })
    return totalCharge;
}


// rendering functions
const updateBill = (deliveryCharge,render) => {
    const total = cart.cartTotal().value;
    const beforeTax = deliveryCharge+total
    const tax = calculateTax(beforeTax);
    const finalBill = tax+beforeTax;
    if (render) {
        document.querySelector(".initial-total").innerHTML = "$"+formatCurrency(total);
        document.querySelector(".delivery-charge").innerHTML = "$"+formatCurrency(deliveryCharge);
        document.querySelector(".before-tax").innerHTML = "$"+formatCurrency(beforeTax);
        document.querySelector(".tax-charged").innerHTML = "$"+formatCurrency(tax);
        document.querySelector(".final-bill").innerHTML = "$"+formatCurrency(finalBill);
    }
    else {
        return finalBill;
    }
}


// listing exports
export {
    formatCurrency,
    totalDeliveryCharge,
    updateBill
};