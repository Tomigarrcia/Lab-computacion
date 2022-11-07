const cardResult = document.querySelector('#card');
const select = document.querySelector('#city');
const submit = document.querySelector('#consult');


submit.addEventListener('click', (e) => {
    
    e.preventDefault();



    //llamando a la API
    callApi(select.value);
})

const callApi = async(city) => {
    const apiID = 'e73ec10739fe2273cde95f72b948cabe';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}`;

    await fetch(url)
        .then(respuesta => respuesta.json())
        .then(ciudades => {
            let temp1 = `
            <h3>${(city)}</h3>
            <img src="https://openweathermap.org/img/wn/${ciudades.weather[0].icon}@2x.png" alt="logo" width="100">
            <p>Temperatura: ${parseInt(ciudades.main.temp - 273.15)}°</p>
            <p>Sencación Térmica: ${parseInt(ciudades.main.feels_like - 273.15)}°</p>
            <p>Humedad: ${ciudades.main.humidity}%</p>
            <p>Velocidad del Viento: ${parseInt(ciudades.wind.speed * 3.6)}km/h</p>
            <p>Presión: ${ciudades.main.pressure} mbar</p>
            <p>Visibilidad: ${ciudades.visibility / 1000} km</p>`

            cardResult.style.display = 'inline-flex';
            cardResult.innerHTML = temp1;
        })
    }
                  


let local = JSON.parse(localStorage.getItem('CITIES'));

local.forEach(ciudades => {
    temp = `<option value='${ciudades}'>${ciudades}</option>`;
    select.innerHTML+=temp;
});

