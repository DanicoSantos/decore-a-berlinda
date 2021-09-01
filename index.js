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

        const raisedFlowers = parseFloat(info['total_raised']) / 10;

        // Change percentage inner text
        app.querySelector("#percentage").innerText = raisedFlowers + " Flores";
    }

    // Fill berlinda with flowers
    const fillWithFlowers = flowers => {
        let flowerCollection = $(flowers);

        for (const flower of flowerCollection) {
            flower.classList.add('flores--active')
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

    /*
    * Certificates API settings
    */
    const certificateApiSettings = {
        username: 'dados.dan.santos@gmail.com',
        password: 'Sp4p4N@d',
        baseUrl: 'https://gerarcertificado.com.br/API'
    }

    const axiosCustom = axios.create({
        baseURL: certificateApiSettings.baseUrl,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json',
        },
        auth: {
            username: certificateApiSettings.username,
            password: certificateApiSettings.password
        },
        withCredentials: true,
    })

    axiosCustom({
        method: 'get',
        url: '/credits/V1',
    })
        .then(response => console.log(response.data))
        .catch(error => console.log(error))

})