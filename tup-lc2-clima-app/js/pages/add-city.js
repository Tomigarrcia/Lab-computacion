//guardando el elemento button en una variable
submit = document.querySelector('#button');

//evento que se activa al hacer click en el button
submit.addEventListener("click", (e) => {

    //deteniendo el accionar por defecto del formulario
    e.preventDefault();

    //obteniendo valores desde el LocalStorage
    function getCitiesFromLocalStorage() {
        let cities = localStorage.getItem("CITIES");
        if (cities) {
            cities = JSON.parse(cities);
        } else {
            cities = [];
        }
        return cities;
    }

    
    //añadiendo valores al LocalStorage
    async function addNewCityToLocalStorage() {
        let cities = getCitiesFromLocalStorage();
        let newCity = document.querySelector('#addcity').value;
        let indice = cities.indexOf(newCity);


        
        const apiID = 'e73ec10739fe2273cde95f72b948cabe';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiID}`;

        //validaciones
        if (newCity == '') {
            document.querySelector('#Error').style.display = 'block';
        } else {
            //consumiendo la API
            //recorriendo la url de la API
            const response = await fetch(url);
            //convirtiendo los datos de la url en objeto JSON
            const datos = await response.json()
                
                //promesa con condicionales
                .then(ciudad => {

                    if (ciudad.cod === '404') {
                        
                        document.querySelector('#Error').style.display = 'block';
                        
                    } else if (indice !== -1) {
                        
                        document.querySelector('#Warning').style.display = 'block';
                        
                    } else {
                        cities.push(newCity);
                        localStorage.setItem("CITIES", JSON.stringify(cities));
                        
                        document.querySelector('#Exito').style.display = 'block';
                        
                    }
                })
        }

      
        
    }
    
    setTimeout(() => {
        window.location.reload();
    }, 3000);

    //inicializando función
    addNewCityToLocalStorage();

})