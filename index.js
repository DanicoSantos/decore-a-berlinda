$(() => {

    const DEFAULT_OPACITY = '20%'

    /**
     * Wordpress connection
     */

    const wpApiSettings = {
        root: 'https://teste.octopass.com.br/wp-json',
    }

    const app = document.querySelector("#app");


    const changeBerlindaOpacity = opacity => {
        // Set berlinda opacity
        app.querySelector("#berlinda").style.opacity = opacity;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = opacity;
    }

    // AJAX request

    $.ajax({
        url: wpApiSettings.root + '/wp/v2/product/265488',
        method: 'GET',
    }).done(function (response) {
        const fundingInfo = response['wpcf_product']
        let raisedPercentToNumber = fundingInfo['raised_percent']

        console.log(raisedPercentToNumber)

        if (raisedPercentToNumber > '20%') {
            changeBerlindaOpacity(fundingInfo['raised_percent'])
        } else {
            changeBerlindaOpacity(DEFAULT_OPACITY)
        }
        




    });


})