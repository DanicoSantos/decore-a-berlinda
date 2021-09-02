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

            const flowersRaised = parseFloat(fundingInfo['total_raised']) / 10;

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

    /*
    * Certificates API settings
    */
    const certificateApiSettings = {
        username: 'dados.dan.santos@gmail.com',
        password: 'Sp4p4N@d',
        baseUrl: 'https://gerarcertificado.com.br/API',
        auth: {
            username: this.username,
            password: this.password,
        }
    }

    const authSettings = {
        username: 'dados.dan.santos@gmail.com',
        password: 'Sp4p4N@d',
    }


    const axiosCustom = axios.create({
        baseURL: certificateApiSettings.baseUrl,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },

    })

    const data = {
            idModeloCertificado: 1019,
            nome: 'Fulano de Tal',
            titulo: 'Decore a Berlinda',
            data: '20 de Agosto',
            cargaHoraria: '10 horas'    
    }

    axiosCustom({
        url: '/create/test/V1/', 
        params: data,
        auth: authSettings,        

    })
        .then(response => {
            if (response.data) {
            }
        })
        .catch(error => console.log(error))

})