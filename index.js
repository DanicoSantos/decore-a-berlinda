const CONSUMER_KEY = 'ck_90403d34d46cf0bfa50c8a2c3242f232b0b18e40'
const CONSUMER_SECRET = 'cs_34af42586560f5a434c6b4b61d6339f67ebf4d52'

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

        $.ajax({
            url: wpApiSettings.root + '/wc/v3/orders/',
            method: 'GET',
            headers: {
                "Authorization": "Basic" + btoa(CONSUMER_KEY + ":" + CONSUMER_SECRET)
            }
        }).done(response => console.log(response))


})