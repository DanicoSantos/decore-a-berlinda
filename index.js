$(() => {

    // App container
    const app = document.querySelector("#app");

    // Default opacity
    const DEFAULT_PERCENTAGE = '20%'

    // Changes opacity
    const changeBerlindaStatus = percentage => {

        const normalizedPercentage = "100" - percentage.replace("%", "")

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
            let raisedPercentToNumber = fundingInfo['raised_percent']


            if (raisedPercentToNumber > '20%') {
                changeBerlindaStatus(fundingInfo['raised_percent'])
            } else {
                changeBerlindaStatus(DEFAULT_PERCENTAGE)
            }
        })
        .fail(error => {
            if (error) {
                $("#canvas").hide();
                $("#content").hide();
                $("#alert").addClass("show")
            }
        });


})