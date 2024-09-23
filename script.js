// Verificar si hay una URL personalizada en la dirección actual
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const shortCode = urlParams.get('url');
    if (shortCode) {
        const originalUrl = localStorage.getItem(shortCode);
        if (originalUrl) {
            window.location.href = originalUrl;
        } else {
            document.getElementById('resultado').innerHTML = '<p class="error">URL personalizada no encontrada.</p>';
        }
    }
}

function personalizarURL() {
    const urlOriginal = document.getElementById('urlOriginal').value;
    let urlPersonalizada = document.getElementById('urlPersonalizada').value;
    const resultado = document.getElementById('resultado');

    if (!urlOriginal) {
        resultado.innerHTML = '<p class="error">Por favor, ingresa una URL válida.</p>';
        return;
    }

    if (!urlPersonalizada) {
        resultado.innerHTML = '<p class="error">Por favor, ingresa una URL personalizada.</p>';
        return;
    }

    // Verificar si la URL personalizada ya existe
    if (localStorage.getItem(urlPersonalizada)) {
        resultado.innerHTML = '<p class="error">Esta URL personalizada ya está en uso. Por favor, elige otra.</p>';
        return;
    }

    // Guardar la URL en localStorage
    localStorage.setItem(urlPersonalizada, urlOriginal);

    const urlActual = window.location.href.split('?')[0]; // Obtener la URL base sin parámetros
    const urlCorta = `${urlActual}?url=${urlPersonalizada}`;

    resultado.innerHTML = `
        <p>URL Original: ${urlOriginal}</p>
        <p>URL Personalizada: <a href="${urlCorta}" target="_blank">${urlCorta}</a></p>
    `;
}