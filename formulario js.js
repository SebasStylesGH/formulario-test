document.addEventListener('DOMContentLoaded', function() {
    const pregunta1Input = document.getElementById('pregunta1Input');
    const pregunta1 = document.getElementById('pregunta1'); // Referencia a la pregunta de edad
    const pregunta2 = document.getElementById('pregunta2');
    const pregunta2Input = document.getElementById('pregunta2Input');
    const pregunta3 = document.getElementById('pregunta3');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const anteriorBtn = document.getElementById('anteriorBtn');
    const enviarBtn = document.getElementById('enviarBtn');
    const form = document.getElementById('dynamicForm');
    const errorMessage = document.getElementById('error-message');

    function toggleSiguienteButton() {
        const isPregunta1Valid = pregunta1Input.value !== "";
        const isPregunta2Valid = !pregunta2.classList.contains('escondida') ? pregunta2Input.value !== "" : true;
        siguienteBtn.disabled = !(isPregunta1Valid && isPregunta2Valid);
    }

    pregunta1Input.addEventListener('change', function() {
        toggleSiguienteButton(); // Solo habilitar el botón "Siguiente" si la pregunta 1 es válida
    });

    pregunta2Input.addEventListener('change', function() {
        toggleSiguienteButton(); // Solo habilitar el botón "Siguiente" si la pregunta 2 es válida
    });

    siguienteBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (pregunta2.classList.contains('escondida')) {
            // Oculta la pregunta 1 y muestra la pregunta 2
            pregunta1.classList.add('escondida'); // Oculta la pregunta 1
            pregunta2.classList.remove('escondida'); // Muestra la pregunta 2
            anteriorBtn.classList.remove('escondida'); // Muestra el botón "Anterior"
        } else if (pregunta3.classList.contains('escondida')) {
            // Oculta la pregunta 2 y muestra la pregunta 3
            pregunta2.classList.add('escondida'); // Oculta la pregunta 2
            pregunta3.classList.remove('escondida'); // Muestra la pregunta 3
        }
        // El botón "Siguiente" permanece visible
    });

    anteriorBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (pregunta3.classList.contains('escondida')) {
            // Muestra la pregunta 1 y oculta la pregunta 2
            pregunta2.classList.add('escondida'); // Oculta la pregunta 2
            pregunta1.classList.remove('escondida'); // Muestra la pregunta 1
            anteriorBtn.classList.add('escondida'); // Oculta el botón "Anterior"
        } else {
            // Muestra la pregunta 2 y oculta la pregunta 3
            pregunta3.classList.add('escondida'); // Oculta la pregunta 3
            pregunta2.classList.remove('escondida'); // Muestra la pregunta 2
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessage.textContent = ''; // Limpiar mensajes de error

        if (pregunta1Input.value === "") {
            errorMessage.textContent += "Por favor, completa la pregunta 1. ";
        }
        if (pregunta2Input.value === "") {
            errorMessage.textContent += "Por favor, completa la pregunta 2. ";
        }
        if (pregunta2Input.value === "si" && pregunta3.value === "") {
            errorMessage.textContent += "Por favor, completa la pregunta 3. ";
        }

        if (errorMessage.textContent === "") {
            alert("Formulario enviado correctamente.");
            // Aquí puedes agregar la lógica para enviar el formulario
        }
    });

    // Cambiar color al mantener presionado el botón
    siguienteBtn.addEventListener('mousedown', function() {
        siguienteBtn.style.backgroundColor = '#0056b3'; // Color más oscuro
    });

    siguienteBtn.addEventListener('mouseup', function() {
        siguienteBtn.style.backgroundColor = ''; // Restablecer color
    });

    siguienteBtn.addEventListener('mouseleave', function() {
        siguienteBtn.style.backgroundColor = ''; // Restablecer color al salir del botón
    });

    anteriorBtn.addEventListener('mousedown', function() {
        anteriorBtn.style.backgroundColor = '#5a6268'; // Color más oscuro
    });

    anteriorBtn.addEventListener('mouseup', function() {
        anteriorBtn.style.backgroundColor = ''; // Restablecer color
    });

    anteriorBtn.addEventListener('mouseleave', function() {
        anteriorBtn.style.backgroundColor = ''; // Restablecer color al salir del botón
    });
});