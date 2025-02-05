document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dynamicForm');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const anteriorBtn = document.getElementById('anteriorBtn');
    const pregunta1 = document.getElementById('pregunta1');
    const pregunta2 = document.getElementById('pregunta2');
    const pregunta3 = document.getElementById('pregunta3');
    const pregunta4 = document.getElementById('pregunta4');
    const pregunta5 = document.getElementById('pregunta5');
    const pregunta6 = document.getElementById('pregunta6');
    const pregunta7 = document.getElementById('pregunta7');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTexto = document.getElementById('resultadoTexto');
    const reiniciarBtn = document.getElementById('reiniciarBtn');

    let preguntaActual = 1; // Contador para la pregunta actual
    let totalPuntos = 0; // Variable para almacenar el puntaje total

    // Función para mostrar la pregunta actual
    function mostrarPregunta() {
        const preguntas = [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, pregunta7];
        preguntas.forEach((pregunta, index) => {
            pregunta.classList.toggle('escondida', index + 1 !== preguntaActual);
        });

        anteriorBtn.classList.toggle('escondida', preguntaActual === 1);
        siguienteBtn.disabled = true; // Deshabilitar el botón "Siguiente" por defecto

        // Habilitar el botón "Siguiente" si hay una respuesta seleccionada
        const opcionesSeleccionadas = document.querySelectorAll(`input[name="${getNombrePregunta()}"]:checked`);
        siguienteBtn.disabled = opcionesSeleccionadas.length === 0;

        // Cambiar el texto del botón "Siguiente" a "Finalizar" en la última pregunta
        if (preguntaActual === 7) {
            siguienteBtn.textContent = "Finalizar";
        } else {
            siguienteBtn.textContent = "Siguiente";
        }
    }

    // Función para obtener el nombre de la pregunta actual
    function getNombrePregunta() {
        switch (preguntaActual) {
            case 1: return 'edadGestacional';
            case 2: return 'comportamiento';
            case 3: return 'frecuenciaCardiaca';
            case 4: return 'sato2';
            case 5: return 'entrecejo';
            case 6: return 'tiempoOjos';
            case 7: return 'surcoNasolabial'; // Para la última pregunta
            default: return '';
        }
    }

    // Evento para los inputs de las preguntas
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            // Habilitar el botón "Siguiente" al seleccionar una respuesta
            const opcionesSeleccionadas = document.querySelectorAll(`input[name="${getNombrePregunta()}"]:checked`);
            siguienteBtn.disabled = opcionesSeleccionadas.length === 0;
        });
    });

    // Evento para el botón "Siguiente"
    siguienteBtn.addEventListener('click', function() {
        if (preguntaActual < 7) { // Cambiar a la siguiente pregunta
            preguntaActual++;
        } else { // Si estamos en la última pregunta, calcular el puntaje
            calcularPuntaje();
        }
        mostrarPregunta();
    });

    // Evento para el botón "Anterior"
    anteriorBtn.addEventListener('click', function() {
        if (preguntaActual > 1) {
            preguntaActual--;
            mostrarPregunta();
        }
    });

    // Función para calcular el puntaje total
    function calcularPuntaje() {
        const respuestas = [
            ...document.querySelectorAll('input[name="edadGestacional"]:checked'),
            ...document.querySelectorAll('input[name="comportamiento"]:checked'),
            ...document.querySelectorAll('input[name="frecuenciaCardiaca"]:checked'),
            ...document.querySelectorAll('input[name="sato2"]:checked'),
            ...document.querySelectorAll('input[name="entrecejo"]:checked'),
            ...document.querySelectorAll('input[name="tiempoOjos"]:checked'),
            ...document.querySelectorAll('input[name="surcoNasolabial"]:checked')
        ];

        respuestas.forEach(respuesta => {
            totalPuntos += parseInt(respuesta.getAttribute('data-puntos'));
        });

        // Determinar el color y el mensaje según el puntaje
        let color;
        let mensaje;

        // Cambiar el color y el mensaje según el puntaje
        if (totalPuntos === 0) {
            color = '#002DF2'; // Color para puntaje 0
            mensaje = 'Sin dolor';
        } else if (totalPuntos >= 1 && totalPuntos <= 3) {
            color = '#002DF2'; // Color para puntajes 1, 2, 3
            mensaje = 'Dolor leve';
        } else if (totalPuntos >= 4 && totalPuntos <= 6) {
            color = '#00B388'; // Color para puntajes 4, 5, 6
            mensaje = 'Dolor leve';
        } else if (totalPuntos >= 7 && totalPuntos <= 12) {
            color = '#F8E08E'; // Color para puntajes 7 a 12
            mensaje = 'Dolor moderado';
        } else if (totalPuntos >= 13 && totalPuntos <= 16) {
            color = '#FF8200'; // Color para puntajes 13, 14, 15, 16
            mensaje = 'Dolor intenso';
        } else if (totalPuntos >= 17 && totalPuntos <= 21) {
            color = '#E40046'; // Color para puntajes 17 a 21
            mensaje = 'Dolor intenso';
        }

        // Mostrar el puntaje
        resultadoTexto.innerHTML = `<span style="color: ${color}; font-size: 100px;">${totalPuntos}</span>`; // Solo el número con color

        // Mostrar el mensaje con el mismo color que el puntaje
        const mensajeElemento = document.getElementById('mensajeResultado');
        mensajeElemento.style.color = color; // Establecer el color del mensaje
        mensajeElemento.textContent = mensaje; // Actualizar el mensaje

        resultadoDiv.classList.remove('escondida');
        form.classList.add('escondida'); // Ocultar el formulario
    }

    // Evento para el botón "Reiniciar"
    reiniciarBtn.addEventListener('click', function() {
        preguntaActual = 1; // Reiniciar a la primera pregunta
        totalPuntos = 0; // Reiniciar el puntaje
        resultadoDiv.classList.add('escondida'); // Ocultar el resultado
        form.classList.remove('escondida'); // Mostrar el formulario
        // Reiniciar todas las selecciones
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
        
        // Limpiar el contenido del resultado
        resultadoTexto.innerHTML = ''; // Limpiar el puntaje
        const mensajeElemento = document.getElementById('mensajeResultado');
        if (mensajeElemento) {
            mensajeElemento.textContent = ''; // Limpiar el mensaje si existe
        }

        mostrarPregunta(); // Mostrar la primera pregunta
    });

    // Inicializar mostrando la primera pregunta
    mostrarPregunta();
});