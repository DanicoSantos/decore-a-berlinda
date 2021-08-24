$(() => {

    // App container
    const app = document.querySelector("#app");


    // Changes opacity
    const changeBerlindaStatus = percentage => {

        // Set berlinda opacity
        app.querySelector("#berlinda-on").style.height = percentage;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = percentage;
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

            if (fundingInfo['raised_percent']) {
                changeBerlindaStatus(fundingInfo['raised_percent'])
            }

        })
        .fail(error => {
            if (error) {
                $("#canvas").hide();
                $("#content").hide();
                $("#alert").addClass("show")
            }
        });

    console.log(localStorage.getItem('octoDonersCount'));
})