feather.replace()

// Constantes para la URL base de la API y tu clave de API
const UrlBase = "https://api.openweathermap.org/data/2.5/weather";
const ApiKey = "aac8b143cbfe5c2d58514792803e2326";

// Función para obtener la información del clima basada en la ubicación actual
function obtenerInfoClima() {
    // Verificar si el navegador soporta geolocalización
    if ("geolocation" in navigator) {
        // Obtener la ubicación del usuario
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            // Construir la URL para la solicitud a la API
            const url = `${UrlBase}?lat=${latitud}&lon=${longitud}&appid=${ApiKey}`;

            // Realizar la solicitud a la API usando fetch
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Extraer la información necesaria del objeto de respuesta JSON
                    const temperatura = data.main.temp; // Temperatura en Kelvin
                    const descripcion = data.weather[0].description; // Descripción del clima

                    // Actualizar los elementos HTML con la información del clima
                    document.querySelector('.weather-temp').textContent = `${Math.round(temperatura - 273.15)}°C`;
                    document.querySelector('.weather-desc').textContent = descripcion;
                })
                .catch(error => {
                    console.log("Error al obtener la información del clima:", error);
                });
        });
    } else {
        console.log("La geolocalización no está disponible en este navegador.");
    }
}

// Llamar a la función para obtener la información del clima al cargar la página
window.onload = function() {
    obtenerInfoClima();
};