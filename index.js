$(() => {

    // App container
    const app = document.querySelector("#app");

    const bottomFlowers = app.querySelectorAll("[id*='floresbaixo']")

    // Add flowers to the bottom group 
    const addBottomFlowers = () => {
        let copiedFlowers = bottomFlowers[0].cloneNode(true)
        let nodeId = bottomFlowers[0].getAttribute("id") + bottomFlowers.length
        copiedFlowers
        copiedFlowers.setAttribute("id", nodeId)
        bottomFlowers[bottomFlowers.length - 1].insertAdjacentElement("afterend", copiedFlowers)
        console.log(bottomFlowers)
    }




    // Changes greyscale percentage
    const changeBerlindaStatus = info => {

        const raisedFlowers = parseFloat(info['total_raised']) / 7.5;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = parseInt(raisedFlowers) + " Flores";
    }

    // Fill berlinda with flowers
    const fillWithFlowers = (flowers, index) => {
        let flowerCollection = $(flowers);

        for (let i = 0; i <= index; i++) {
            flowerCollection[i].classList.add('flores--active')
        }
    }

    /**
     * Wordpress connection
     */

    // Wordpress config
    const wpApiSettings = {
        root: 'https://berlinda.lojinhadocirio.com.br/wp-json',
        productID: '265488'
    }

    // AJAX request

    $.ajax({
        url: wpApiSettings.root + '/wp/v2/product/' + wpApiSettings.productID,
        method: 'GET',
    })
        .done(function (response) {
            const fundingInfo = response['wpcf_product']

            if (fundingInfo) {
                changeBerlindaStatus(fundingInfo)
            }

            const flowersRaised = parseFloat(fundingInfo['total_raised']) / 7.5;

            if (flowersRaised <= 10000) {
                index = 3;
            } else if (flowersRaised > 10000 <= 20000) {
                index = 6;
            } else if (flowersRaised > 20000 <=30000) {
                index = 9;
            } else if (flowersRaised > 30000 <= 40000) {
                index = 12;
            } else if (flowersRaised > 40000) {
                index = 15;
            }

            fillWithFlowers('[id*=octoflores]', index)

        })
        .fail(error => {
            if (error) {
                $("#canvas").hide();
                $("#content").hide();
                $("#alert").addClass("show")
            }
        });

        // Confetti instance

        const confettiSettings = {
            target: 'canvas',
        };
        var confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

   

})