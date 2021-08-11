$(() => {

    // App container
    const app = document.querySelector("#app");

    // Default opacity
    const DEFAULT_OPACITY = '20%'

    // Changes opacity
    const changeBerlindaOpacity = opacity => {
        // Set berlinda opacity
        app.querySelector("#berlinda").style.opacity = opacity;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = opacity;
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
    }).done(function (response) {
        const fundingInfo = response['wpcf_product']
        let raisedPercentToNumber = fundingInfo['raised_percent']


        if (raisedPercentToNumber > '20%') {
            changeBerlindaOpacity(fundingInfo['raised_percent'])
        } else {
            changeBerlindaOpacity(DEFAULT_OPACITY)
        }
    });


})