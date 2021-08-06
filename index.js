const FUNDING_PERCENTAGE = 0.4;
let opacity = '20%';

if (FUNDING_PERCENTAGE > 0.2) {
    opacity = `${FUNDING_PERCENTAGE*100}%`;
}

const app = document.querySelector("#app");


const changeBerlindaOpacity = () =>{
    // Set berlinda opacity
    app.querySelector("#berlinda").style.opacity = opacity;

    // Change percentage inner text
    app.querySelector("#percentage").innerText = opacity;
}

changeBerlindaOpacity();