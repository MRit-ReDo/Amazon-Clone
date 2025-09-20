// initializing variables
const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const dividend = [31,28,31,30,31,30,31,31,30,31,30,31]

const supplement = [["0","FREE"],["499","$4.99 -"],["999","$9.99 -"]];


// defining helper functions
const formatToday = () => {
    const today = dayjs();
    return months[today.$M]+" "+String(today.$M)
}

const subtractDates = (date) => {
    const today = dayjs();
    const splitDate = date.split(" ")
    const compare = Number(splitDate[2])
    let remaining;
    for (let i = 0; i < 10; i++) {
        if ((today.$D+i)%dividend[today.$M] === compare) {
            remaining = i
        }
    }
    let status = 0;
    let percentage = Number((((9-remaining)/9)*100).toFixed(0));
    if (percentage === 0) {
        return [10,0]
    }
    else if (percentage < 100 && percentage >= 45) {
        status = 1;
    }
    else if (percentage === 100) {
        return [100,2]
    }
    else if (percentage < 45 && percentage > 0) {
        status = 0;
    }
    return [percentage,status]
}

const isWeekend = (day) => {
    if (day.$W === 0) {
        return day.add(1,"day");
    }
    else if (day.$W === 6) {
        return day.add(2,"day");
    }
    return day;
}

const calculateDeliveryDates = () => {
    const today = dayjs();
    const possible = [isWeekend(today.add(7,"day")),isWeekend(today.add(5,"day")),isWeekend(today.add(2,"day"))];
    let options = [];
    possible.forEach((day) => {
        options.push({
            day: day.$W,
            month: day.$M,
            date: day.$D
        });
    });
    return options;
}

const deliveryOptions = (options) => {
    let formattedOptions = [];
    options.forEach((option) => {
        formattedOptions.push(weekDays[option.day]+", "+months[option.month]+" "+String(option.date))
    });
    return formattedOptions;
}


// defining variables
const deliveryDates = deliveryOptions(calculateDeliveryDates());


// rendering functions
const renderDeliverySelection = (id) => {
    let deliveryOptionsHTML = `<div class="delivery-options-title">Choose a delivery option:</div>`;
    let counter = 0;
    deliveryDates.forEach(date => {
        deliveryOptionsHTML += `
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" checked name="delivery-option-${id}"
                data-date="${date}" data-charge="${supplement[counter][0]}" data-id="${id}">
                <div>
                    <div class="delivery-option-date">${date}</div>
                    <div class="delivery-option-price">${supplement[counter][1]} Shipping</div>
                </div>
            </div>
        `
        counter += 1
    });
    return deliveryOptionsHTML
}


// listing exports
export {
    formatToday,
    subtractDates,
    deliveryDates,
    renderDeliverySelection
};