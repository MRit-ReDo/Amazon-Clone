// defining classes
class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }

    formatRatingImage = () => {
        return "images/ratings/rating-"+String(this.rating.stars*10)+".png";
    }

    renderExtraInformation = () => {
        return "";
    }
}

class Clothing extends Product {
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails);
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    renderExtraInformation = () => {
        return `<a href="${this.sizeChartLink}" target="_self" style="cursor: pointer"
        onmouseover="this.style.color='rgb(196, 80, 0)';"
        onmouseout="this.style.color='rgb(1, 124, 182)';">Size chart</a>`
    }
}

class Appliance extends Product {
    instructionsLink;
    warrantyLink;

    constructor(productDetails) {
        super(productDetails);
        this.instructionsLink = productDetails.instructionsLink;
        this.warrantyLink = productDetails.warrantyLink;
    }

    renderExtraInformation = () => {
        return `
        <span>
            <a href="${this.instructionsLink}" target="_self" style="cursor: pointer; margin-right: 5px"
            onmouseover="this.style.color='rgb(196, 80, 0)';"
            onmouseout="this.style.color='rgb(1, 124, 182)';">Instructions</a>
            <a href="${this.warrantyLink}" target="_self" style="cursor: pointer"
            onmouseover="this.style.color='rgb(196, 80, 0)';"
            onmouseout="this.style.color='rgb(1, 124, 182)';">Warranty</a>
        </span>
        `
    }
}


// defining variables
let products = [];


// defining helper functions
const findProductByID = (array,id) => {
    let index = null;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
                index = i;
            }
        }
        return array[index];
}

const loadProducts = () => {
    const promise = fetch("https://supersimplebackend.dev/products").then((response) => {
        return response.json()
    }).then((productData) => {
        products = productData.map((productDetails) => {
            if (productDetails.type === "clothing") {
                return new Clothing(productDetails);
            }
            else if (productDetails.keywords.indexOf("appliances") > -1) {
                return new Appliance(productDetails);
            }
            return new Product(productDetails);
        })
    }).catch((error) => {
        console.log(error);
    })
    return promise;
}


// listing exports
export {
    products,
    findProductByID,
    loadProducts
};


