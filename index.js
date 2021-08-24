$(() => {

    // App container
    const app = document.querySelector("#app");


    // Changes opacity
    const changeBerlindaStatus = info => {

        // Set berlinda opacity
        app.querySelector("#berlinda-on").style.height = info['raised_percent'];

        const raisedFlowers = parseFloat(info['total_raised']) / 10;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = raisedFlowers + " Flores";
    }

    /**
     * Wordpress connection
     */

    // Wordpress config
    const wpApiSettings = {
        root: 'https://teste.octopass.com.br/wp-json',
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

            console.log(response);

        })
        .fail(error => {
            if (error) {
                $("#canvas").hide();
                $("#content").hide();
                $("#alert").addClass("show")
            }
        });

})