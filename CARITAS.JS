document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dynamicForm');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTexto = document.getElementById('resultadoTexto');
    const mensajeElemento = document.getElementById('mensajeResultado');
    const reiniciarBtn = document.getElementById('reiniciarBtn');

    // Variable para almacenar el puntaje total
    let totalPuntos = 0;

    // Función para calcular el puntaje total
    function calcularPuntaje() {
        const respuestaSeleccionada = document.querySelector('input[name="nivelDolor"]:checked');
        if (respuestaSeleccionada) {
            totalPuntos = parseInt(respuestaSeleccionada.value); // Obtener el valor seleccionado
        }

        // Determinar el color y el mensaje según el puntaje
        let color;
        let mensaje;

        // Cambiar el color y el mensaje según el puntaje
        if (totalPuntos === 0) {
            color = '#041E42'; // Color para "Ausencia de dolor"
            mensaje = 'Ausencia de dolor';
        } else if (totalPuntos >= 1 && totalPuntos <= 1) {
            color = '#08b48d'; // Color para "Dolor leve"
            mensaje = 'Duele solo un poco';
        } else if (totalPuntos >= 2 && totalPuntos <= 2) {
            color = '#f9e08f'; // Color para "Dolor moderado"
            mensaje = 'Duele un poco más';
        } else if (totalPuntos >= 3 && totalPuntos <= 3) {
            color = '#fe8201'; // Color para "Dolor severo o intenso"
            mensaje = 'Duele aún más';
        } else if (totalPuntos >= 4 && totalPuntos <= 4) {
            color = '#cc7b36'; // Color para "Dolor severo o intenso"
            mensaje = 'Duele mucho más';
        } else if (totalPuntos >= 5 && totalPuntos <= 5) {
            color = '#e50146'; // Color para "Dolor severo o intenso"
            mensaje = 'Duele tanto como pueda imaginarse';
        }

        // Mostrar el puntaje
        resultadoTexto.innerHTML = `<span style="color: ${color}; font-size: 100px;">${totalPuntos}</span>`; // Solo el número con color

        // Mostrar el mensaje con el mismo color que el puntaje
        mensajeElemento.style.color = color; // Establecer el color del mensaje
        mensajeElemento.textContent = mensaje; // Actualizar el mensaje

        resultadoDiv.classList.remove('escondida');
        form.classList.add('escondida'); // Ocultar el formulario
    }

    // Evento para los inputs de la pregunta
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            // Habilitar el botón "Siguiente" al seleccionar una respuesta
            siguienteBtn.disabled = false;
        });
    });

    // Evento para el botón "Siguiente"
    siguienteBtn.addEventListener('click', function() {
        calcularPuntaje(); // Calcular el puntaje
    });

    // Evento para el botón "Reiniciar"
    reiniciarBtn.addEventListener('click', function() {
        totalPuntos = 0; // Reiniciar el puntaje
        resultadoDiv.classList.add('escondida'); // Ocultar el resultado
        form.classList.remove('escondida'); // Mostrar el formulario
        // Reiniciar todas las selecciones
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
        
        // Limpiar el contenido del resultado
        resultadoTexto.innerHTML = ''; // Limpiar el puntaje
        mensajeElemento.textContent = ''; // Limpiar el mensaje
    });

    // Inicializar mostrando la primera pregunta
    mostrarPregunta();
});