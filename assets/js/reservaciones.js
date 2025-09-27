// Espera a la carga del DOM

document.addEventListener('DOMContentLoaded', function() {

    // Referencias a los elementos del formulario.
    const reservationForm = document.getElementById('reservationForm');
    const confirmMessage = document.getElementById('confirmationMessage');
    const reservationDetail = document.getElementById('reservationDetails');

    // Configuración del campo fecha.
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Siguiente día
        const formMattedDate = tomorrow.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        fechaInput.min = formMattedDate; // Establece la fecha mínima

        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3); // Tres meses en el futuro
        fechaInput.max = maxDate.toISOString().split('T')[0]; // Establece la fecha máxima
    }

    // Validación de envió de formulario.
    if (reservationForm) {

        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío del formulario

            // Validar datos.
            if (!validateReservationForm()) return;

            // Recogemos datos del formulario.
            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                personas: document.getElementById('personas').value,
                ocasion: document.getElementById('ocasion').value,
                comentarios: document.getElementById('comentarios').value.trim()
            }

            console.log('Datos del formulario:', formData); // Para depuración

            showConfirmation(formData);
        });

        // validación de campos requeridos.
        function validateReservationForm() {

            let isValid = true;

            const requiredFields = ['nombre', 'email', 'telefono', 'fecha', 'hora', 'personas'];

            requiredFields.forEach(field => {
                
                const input = document.getElementById(field);

                if(!input.value.trim()) {
                    markInvalid(input, 'Este campo es obligatorio');
                    isValid = false;
                } else {
                    markValid(input);
                }

            });

            // /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            // /^\d{7,15}$/

            // Validación de email.
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailInput.value && !emailRegex.test(emailInput.value.trim())) {
                markInvalid(emailInput, 'Por favor, ingresa un correo electrónico válido.');
                isValid = false;
            }

            // Validación de teléfono.
            const telefonoInput = document.getElementById('telefono');
            const phoneRegex = /^\d{7,15}$/; // Entre 7 y 15 dígitos

            if (telefonoInput.value && !phoneRegex.test((telefonoInput.value.replace(/[\s\-()]/g, '')))) {
                markInvalid(telefonoInput, 'Por favor, ingresa un número de teléfono válido (7-15 dígitos).');
            }
        
            return isValid;
        }
        
        function markInvalid(input, message) {

            input.style.borderColor = 'red';

            let errorElement = input.parentElement.querySelector('.error-message');

            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = 'red';
                errorElement.style.fontSize = '12px';
                errorElement.style.marginTop = '5px';
                input.parentElement.appendChild(errorElement);
            }

            errorElement.textContent = message;

        }

        function markValid(input) {

            input.style.borderColor = 'green';

            const errorElement = input.parentElement.querySelector('.error-message');

            if (errorElement) {

                errorElement.remove();

            }
            
        }
    }

});