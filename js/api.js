// Obtén una referencia al elemento HTML donde deseas mostrar los resultados
const resultsContainer = document.getElementById('results-container');

// Función para realizar la solicitud a la API y obtener los datos de los personajes
function getCharacterData() {
  return new Promise((resolve, reject) => {
    // Crea una instancia del objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/characters');

    // Maneja la respuesta de la solicitud
    xhr.onload = function () {
      if (xhr.status === 200) {
        // La solicitud fue exitosa, analiza los datos de respuesta en formato JSON
        const data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        // Hubo un error en la solicitud
        reject(xhr.status);
      }
    };

    // Maneja los errores de conexión
    xhr.onerror = function () {
      reject('Error de conexión');
    };

    // Envía la solicitud
    xhr.send();
  });
}

// Función para renderizar los datos de los personajes en el HTML
function renderCharacterData(data) {
  // Limpia el contenido anterior
  resultsContainer.innerHTML = '';

  // Itera sobre los personajes y crea un elemento HTML para cada uno
  data.forEach(character => {
    const article = document.createElement('div');
    article.innerHTML = `
        <div class="col mb-4 ">
            <div class="card box">
                <div class="card-body">
                <div class="text-center">
                    <img src="${character.image_url}" style="height: 250px;" alt="logo">
                </div>
                <h3 class="card-title text-center">${character.name}</h3>
                <div class="d-flex justify-content-between mt-1">
                    <p class="text-white fw-bold fs-7 p-1 bg-black rounded">${character.constellation}</p>
                    <p class="text-white fw-bold fs-7 p-1 bg-primary rounded">${character.rank}</p>
                </div>
                <p class="fst-normal" style="text-align: justify;">${character.description}</p>
                </div>
            </div>
        </div>
    `;
    resultsContainer.appendChild(article);
  });
}

// Utiliza la función getCharacterData para obtener los datos de los personajes y luego renderízalos en el HTML
getCharacterData()
  .then(data => {
    renderCharacterData(data);
  })
  .catch(error => {
    console.log('Error:', error);
    // Maneja el errores
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Ocurrió un error al obtener los datos de los personajes. Por favor, intenta nuevamente más tarde.';
    errorMessage.style.color = 'red';
    resultsContainer.appendChild(errorMessage);
});