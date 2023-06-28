// Obtén una referencia al elemento HTML donde deseas mostrar los resultados
const resultsContainer = document.getElementById('results-container');

// Función para obtener los datos de los personajes usando fetch
function getCharacterData() {
  return fetch('http://127.0.0.1:8000/characters')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
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
    // Manejo de error
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Ocurrió un error al obtener los datos de los personajes. Por favor, intenta nuevamente más tarde.';
    errorMessage.style.color = 'red';
    resultsContainer.appendChild(errorMessage);
});


/*
función fetch para realizar la solicitud a la API de manera asíncrona:
En este código, se utiliza la función fetch para realizar la solicitud GET a la API de manera asíncrona. 
Luego, se verifica si la respuesta es exitosa utilizando response.ok, y en caso contrario se lanza un error con el estado de la respuesta. 
Si la respuesta es exitosa, se llama al método json() para analizar la respuesta en formato JSON. 
Finalmente, los datos obtenidos se pasan a la función renderCharacterData para renderizarlos en el HTML.
*/