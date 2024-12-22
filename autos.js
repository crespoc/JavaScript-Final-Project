document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Función para ocultar todas las secciones y mostrar solo la seleccionada
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Inicialmente, mostrar solo la primera sección
    showSection('about');

    // Agregar eventos de click a los enlaces del menú
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar el comportamiento por defecto de los enlaces
            const sectionId = link.getAttribute('data-section'); // Obtener el ID de la sección a mostrar
            showSection(sectionId);
        });
    });
});

document.getElementById("car-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const model = document.getElementById("car-model").value.trim();
    const carInfoContainer = document.getElementById("car-info");
    carInfoContainer.innerHTML = "<p>Cargando información...</p>";

    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/cars?limit=2&model=${model}`, {
            headers: {
                "X-Api-Key": "uoptjeutgKPpBLXcK0XoFg==5gyI9mn8iYQQJiHG"
            }
        });
        
        if (!response.ok) {
            throw new Error("No se pudo obtener la información del auto.");
        }

        const data = await response.json();
        carInfoContainer.innerHTML = ""; // Limpiamos resultados previos

        if (data.length === 0) {
            carInfoContainer.innerHTML = "<p>No se encontraron autos para este modelo.</p>";
        } else {
            data.forEach(car => {
                carInfoContainer.innerHTML += `
                  <div>
                      <h4>${car.make} ${car.model} (${car.year})</h4>
                      <p>Clase: ${car.class}</p>
                      <p>Consumo (Ciudad): ${car.city_mpg} MPG</p>
                      <p>Consumo (Combinado): ${car.combination_mpg} MPG</p>
                      <p>Cilindros: ${car.cylinders}</p>
                      <p>Transmisión: ${car.transmission.toUpperCase()}</p>
                      <p>Combustible: ${car.fuel_type}</p>
                  </div>
                  <hr>
                `;
            });
        }
    } catch (error) {
        carInfoContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
