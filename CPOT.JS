document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dynamicForm');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const anteriorBtn = document.getElementById('anteriorBtn');
    const pregunta1 = document.getElementById('pregunta1');
    const pregunta2 = document.getElementById('pregunta2');
    const pregunta3 = document.getElementById('pregunta3');
    const advertencia = document.getElementById('advertencia');
    const preguntaIntubado = document.getElementById('preguntaIntubado');
    const preguntaExtubado = document.getElementById('preguntaExtubado');
    const resultadoDiv = document.getElementById('resultado');
    const resultadoTexto = document.getElementById('resultadoTexto');
    const reiniciarBtn = document.getElementById('reiniciarBtn');

    let preguntaActual = 1; // Contador para la pregunta actual
    let totalPuntos = 0; // Variable para almacenar el puntaje total
    let estadoActual = null; // Variable para almacenar el estado actual (intubado o extubado)

    // Función para mostrar la pregunta actual
    function mostrarPregunta() {
        const preguntas = [pregunta1, pregunta2, pregunta3, advertencia, preguntaIntubado, preguntaExtubado];
        preguntas.forEach((pregunta, index) => {
            pregunta.classList.toggle('escondida', index + 1 !== preguntaActual);
        });

        anteriorBtn.classList.toggle('escondida', preguntaActual === 1);
        siguienteBtn.disabled = true; // Deshabilitar el botón "Siguiente" por defecto

        // Habilitar el botón "Siguiente" si hay una respuesta seleccionada
        const opcionesSeleccionadas = document.querySelectorAll(`input[name="${getNombrePregunta()}"]:checked`);
        siguienteBtn.disabled = opcionesSeleccionadas.length === 0;

        // Si estamos en la advertencia, no mostramos las preguntas adicionales aún
        if (preguntaActual === 4) {
            preguntaIntubado.classList.add('escondida');
            preguntaExtubado.classList.add('escondida');
        }

        // Cambiar el texto del botón "Siguiente" a "Finalizar" en la pregunta de intubado
        if (preguntaActual === 5) {
            siguienteBtn.textContent = "Finalizar";
        } else {
            siguienteBtn.textContent = "Siguiente";
        }
    }

    // Función para obtener el nombre de la pregunta actual
    function getNombrePregunta() {
        switch (preguntaActual) {
            case 1: return 'expresion';
            case 2: return 'movimientos';
            case 3: return 'tension';
            case 4: return 'estado'; // Para la advertencia
            case 5: return 'adaptacionVentilador'; // Para la pregunta de intubado
            case 6: return 'vocalizacion'; // Para la pregunta de extubado
            default: return '';
        }
    }

    // Evento para los inputs de las preguntas
    document.querySelectorAll('input[name="expresion"], input[name="movimientos"], input[name="tension"], input[name="estado"], input[name="adaptacionVentilador"], input[name="vocalizacion"]').forEach(input => {
        input.addEventListener('change', mostrarPregunta);
    });

    // Evento para el botón "Siguiente"
    siguienteBtn.addEventListener('click', function() {
        if (preguntaActual === 4) { // Si estamos en la advertencia
            const estadoSeleccionado = document.querySelector('input[name="estado"]:checked');
            if (estadoSeleccionado) {
                estadoActual = estadoSeleccionado.value; // Guardar el estado actual
                preguntaActual = estadoActual === 'intubado' ? 5 : 6; // Ir a la pregunta correspondiente
                totalPuntos = 0; // Reiniciar el puntaje al cambiar de estado
            }
        } else if (preguntaActual === 5) { // Si estamos en la pregunta de intubado
            calcularPuntaje(); // Calcular el puntaje directamente
        } else if (preguntaActual < 6) { // Cambiar a la siguiente pregunta
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
                ...document.querySelectorAll('input[name="expresion"]:checked'),
                ...document.querySelectorAll('input[name="movimientos"]:checked'),
                ...document.querySelectorAll('input[name="tension"]:checked'),
                ...document.querySelectorAll('input[name="adaptacionVentilador"]:checked'),
                ...document.querySelectorAll('input[name="vocalizacion"]:checked')
            ];
    
            respuestas.forEach(respuesta => {
                totalPuntos += parseInt(respuesta.getAttribute('data-puntos'));
            });
    
            // Determinar el color y el mensaje según el puntaje
            let color;
            let mensaje;
    
            if (totalPuntos === 0) {
                color = '#00B388'; // Verde
                mensaje = 'Sin dolor';
            } else if (totalPuntos >= 1 && totalPuntos <= 2) {
                color = '#00B388'; // Verde
                mensaje = 'Dolor leve';
            } else if (totalPuntos >= 3 && totalPuntos <= 5) {
                color = '#FF8200'; // Amarillo/Naranja
                mensaje = 'Dolor moderado';
            } else if (totalPuntos >= 6 && totalPuntos <= 8) {
                color = '#E40046'; // Rojo
                mensaje = 'Dolor severo';
            }
    
            // Mostrar el puntaje
            resultadoTexto.innerHTML = `<span style="color: ${color}; font-size: 100px;">${totalPuntos}</span>`; // Solo el número con color
    
            // Mostrar el mensaje
            const mensajeElemento = document.getElementById('mensajeResultado');
            mensajeElemento.textContent = mensaje; // Actualizar el mensaje
    
            resultadoDiv.classList.remove('escondida');
            form.classList.add('escondida'); // Ocultar el formulario
        }
    
        // Evento para el botón "Reiniciar"
        reiniciarBtn.addEventListener('click', function() {
            preguntaActual = 1; // Reiniciar a la primera pregunta
            totalPuntos = 0; // Reiniciar el puntaje
            estadoActual = null; // Reiniciar el estado actual
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