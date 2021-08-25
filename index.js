$(() => {

    // App container
    const app = document.querySelector("#app");


    // Changes opacity
    const changeBerlindaStatus = info => {

        const raisedFlowers = parseFloat(info['total_raised']) / 10;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = raisedFlowers + " Flores";
    }

    // Fill berlinda with flowers
    const fillWithFlowers = flowers => {
        let flowerCollection = $(flowers);

        for (const flower of flowerCollection) {
            $(flower).show();
        }
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

            fillWithFlowers('.flores')

        })
        .fail(error => {
            if (error) {
                $("#canvas").hide();
                $("#content").hide();
                $("#alert").addClass("show")
            }
        });

        
})