// import statements
import { 
    products,
    findProductByID
} from "./products.js";


// defining classes
class Cart {
    #localStorageKey;
    cart = undefined;
    products;

    constructor(localStorageKey,products) {
        this.localStorageKey = localStorageKey;
        this.cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.products = products;
    }

    updateLocalStorage = () => {
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cart));
    }

    cartTotal = () => {
        let totalValue = 0;
        let totalItems = 0;
        this.cart.forEach(cartItem => {
            const product = findProductByID(products,cartItem.id);
            totalValue += product.priceCents*cartItem.qty;
            totalItems += cartItem.qty;
        })
        return {
            value: totalValue,
            number: totalItems
        };
    }

    deleteFromCheckoutPage = (id) => {
        console.log("l");
        this.cart = this.cart.filter((cartItem) => {
            return cartItem.id !== id;
        })
        this.updateLocalStorage();
        document.querySelector(".cart-item-"+id).remove();
    }

    saveUpdateFromCheckoutPage = (id) => {
        const value = Number(document.querySelector(".save-quantity-input-"+id).value);
        if (value > 0 && value <= 100) {
            const match = findProductByID(this.cart,id);
            match.qty = value;
            this.updateLocalStorage();
            document.querySelector(".quantity-label-"+id).innerHTML = value;
        }
    }

    displayAddedToCartMessage = (id) => {
        document.querySelector(".added-"+id).classList.add("visible");
        setTimeout(() => {
            document.querySelector(".added-"+id).classList.remove("visible");
        },2000);
    }

    addProductsToCart = (id) => {
        const toAdd = Number(document.querySelector(".select-"+id).value) || 1;
        const match = findProductByID(this.cart,id);
        if (match) {
            match.qty += toAdd;
        }
        else {
            const cartItem = {
                id: id,
                qty: toAdd
            }
            this.cart.push(cartItem);
        }
        this.updateLocalStorage();
        document.querySelector(".select-"+id).value = 1;
    }
}


// defining variables
const cart = new Cart("cart",products);


// listing exports
export {
    cart,
    findProductByID,
};