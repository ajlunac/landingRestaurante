// ============================================================================
// CONTACTO.JS - JavaScript para la página de contacto
// La Belle Cuisine Restaurant
// ============================================================================

/**
 * Espera a que el DOM esté completamente cargado antes de ejecutar el código
 */
document.addEventListener('DOMContentLoaded', function() {

    // ========================================================================
    // REFERENCIAS A ELEMENTOS DEL DOM
    // ========================================================================
    
    const contactForm = document.getElementById('contactForm');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    const btnNuevoMensaje = document.getElementById('btnNuevoMensaje');
    const btnEnviar = document.getElementById('btnEnviar');
    
    // Campos del formulario
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const asuntoSelect = document.getElementById('asunto');
    const mensajeTextarea = document.getElementById('mensaje');
    const terminosCheckbox = document.getElementById('terminos');

    // ========================================================================
    // VALIDACIÓN DEL FORMULARIO
    // ========================================================================

    /**
     * Valida todos los campos del formulario
     * @returns {boolean} - true si todos los campos son válidos, false si hay errores
     */
    function validarFormulario() {
        let esValido = true;

        // Validar nombre (mínimo 3 caracteres, solo letras y espacios)
        if (!validarNombre(nombreInput.value.trim())) {
            marcarCampoInvalido(nombreInput, 'El nombre debe tener al menos 3 caracteres y solo letras.');
            esValido = false;
        } else {
            marcarCampoValido(nombreInput);
        }

        // Validar email
        if (!validarEmail(emailInput.value.trim())) {
            marcarCampoInvalido(emailInput, 'Por favor, ingresa un correo electrónico válido.');
            esValido = false;
        } else {
            marcarCampoValido(emailInput);
        }

        // Validar teléfono (7-15 dígitos)
        if (!validarTelefono(telefonoInput.value.trim())) {
            marcarCampoInvalido(telefonoInput, 'El teléfono debe tener entre 7 y 15 dígitos.');
            esValido = false;
        } else {
            marcarCampoValido(telefonoInput);
        }

        // Validar asunto
        if (asuntoSelect.value === '') {
            marcarCampoInvalido(asuntoSelect, 'Por favor, selecciona un asunto.');
            esValido = false;
        } else {
            marcarCampoValido(asuntoSelect);
        }

        // Validar mensaje (mínimo 10 caracteres)
        if (mensajeTextarea.value.trim().length < 10) {
            marcarCampoInvalido(mensajeTextarea, 'El mensaje debe tener al menos 10 caracteres.');
            esValido = false;
        } else {
            marcarCampoValido(mensajeTextarea);
        }

        // Validar términos y condiciones
        if (!terminosCheckbox.checked) {
            mostrarErrorCheckbox(terminosCheckbox, 'Debes aceptar los términos y condiciones.');
            esValido = false;
        } else {
            ocultarErrorCheckbox(terminosCheckbox);
        }

        return esValido;
    }

    /**
     * Valida el formato del nombre
     * @param {string} nombre - Nombre a validar
     * @returns {boolean}
     */
    function validarNombre(nombre) {
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        return nombreRegex.test(nombre);
    }

    /**
     * Valida el formato del email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida el formato del teléfono
     * @param {string} telefono - Teléfono a validar
     * @returns {boolean}
     */
    function validarTelefono(telefono) {
        const telefonoLimpio = telefono.replace(/[\s\-()]/g, '');
        const telefonoRegex = /^\d{7,15}$/;
        return telefonoRegex.test(telefonoLimpio);
    }

    /**
     * Marca un campo como inválido y muestra mensaje de error
     * @param {HTMLElement} campo - Campo a marcar
     * @param {string} mensaje - Mensaje de error
     */
    function marcarCampoInvalido(campo, mensaje) {
        campo.style.borderColor = '#e74c3c';
        campo.style.backgroundColor = 'rgba(231, 76, 60, 0.05)';

        // Remover mensaje de error anterior si existe
        const errorAnterior = campo.parentElement.querySelector('.error-message');
        if (errorAnterior) {
            errorAnterior.remove();
        }

        // Crear nuevo mensaje de error
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = mensaje;

        campo.parentElement.appendChild(errorElement);

        // Agregar animación de shake
        campo.style.animation = 'shake 0.3s ease-in-out';
        setTimeout(() => {
            campo.style.animation = '';
        }, 300);
    }

    /**
     * Marca un campo como válido
     * @param {HTMLElement} campo - Campo a marcar
     */
    function marcarCampoValido(campo) {
        campo.style.borderColor = '#27ae60';
        campo.style.backgroundColor = 'rgba(39, 174, 96, 0.05)';

        // Remover mensaje de error si existe
        const errorElement = campo.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Muestra error para checkbox
     * @param {HTMLElement} checkbox - Checkbox
     * @param {string} mensaje - Mensaje de error
     */
    function mostrarErrorCheckbox(checkbox, mensaje) {
        const container = checkbox.parentElement;
        
        // Remover error anterior si existe
        const errorAnterior = container.querySelector('.error-checkbox');
        if (errorAnterior) {
            errorAnterior.remove();
        }

        // Crear mensaje de error
        const errorElement = document.createElement('div');
        errorElement.className = 'error-checkbox';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = mensaje;

        container.appendChild(errorElement);
        container.style.animation = 'shake 0.3s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 300);
    }

    /**
     * Oculta error de checkbox
     * @param {HTMLElement} checkbox - Checkbox
     */
    function ocultarErrorCheckbox(checkbox) {
        const container = checkbox.parentElement;
        const errorElement = container.querySelector('.error-checkbox');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // ========================================================================
    // MANEJO DEL ENVÍO DEL FORMULARIO
    // ========================================================================

    /**
     * Maneja el evento de envío del formulario
     */
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validar formulario
            if (!validarFormulario()) {
                console.log('Formulario no válido');
                return;
            }

            // Deshabilitar botón de envío para evitar múltiples envíos
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'Enviando...';
            btnEnviar.style.opacity = '0.6';

            // Recopilar datos del formulario
            const datosFormulario = {
                nombre: nombreInput.value.trim(),
                email: emailInput.value.trim(),
                telefono: telefonoInput.value.trim(),
                asunto: asuntoSelect.value,
                mensaje: mensajeTextarea.value.trim(),
                fecha: new Date().toLocaleString('es-CO')
            };

            // Simular envío (en producción, aquí iría una petición AJAX/fetch)
            setTimeout(() => {
                console.log('Datos del formulario:', datosFormulario);
                mostrarConfirmacion(datosFormulario);
                
                // Rehabilitar botón
                btnEnviar.disabled = false;
                btnEnviar.textContent = 'Enviar mensaje';
                btnEnviar.style.opacity = '1';
            }, 1500);
        });
    }

    /**
     * Muestra el mensaje de confirmación y oculta el formulario
     * @param {Object} datos - Datos del formulario enviado
     */
    function mostrarConfirmacion(datos) {
        if (contactForm && mensajeConfirmacion) {
            // Ocultar formulario con animación
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                
                // Mostrar mensaje de confirmación
                mensajeConfirmacion.style.display = 'block';
                mensajeConfirmacion.style.opacity = '0';
                mensajeConfirmacion.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    mensajeConfirmacion.style.transition = 'all 0.5s ease';
                    mensajeConfirmacion.style.opacity = '1';
                    mensajeConfirmacion.style.transform = 'translateY(0)';
                }, 50);
            }, 300);

            // Log para desarrollo
            console.log('Mensaje enviado exitosamente:', datos);
        }
    }

    /**
     * Maneja el botón de "Nuevo mensaje"
     */
    if (btnNuevoMensaje) {
        btnNuevoMensaje.addEventListener('click', function() {
            resetearFormulario();
        });
    }

    /**
     * Resetea el formulario y vuelve a mostrarlo
     */
    function resetearFormulario() {
        // Ocultar mensaje de confirmación
        mensajeConfirmacion.style.opacity = '0';
        mensajeConfirmacion.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            mensajeConfirmacion.style.display = 'none';
            
            // Resetear formulario
            contactForm.reset();
            
            // Limpiar estilos de validación
            limpiarEstilosValidacion();
            
            // Mostrar formulario
            contactForm.style.display = 'block';
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                contactForm.style.transition = 'all 0.5s ease';
                contactForm.style.opacity = '1';
                contactForm.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }

    /**
     * Limpia los estilos de validación de todos los campos
     */
    function limpiarEstilosValidacion() {
        const campos = [nombreInput, emailInput, telefonoInput, asuntoSelect, mensajeTextarea];
        
        campos.forEach(campo => {
            if (campo) {
                campo.style.borderColor = '';
                campo.style.backgroundColor = '';
                
                const errorElement = campo.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });

        // Limpiar error de checkbox
        if (terminosCheckbox) {
            ocultarErrorCheckbox(terminosCheckbox);
        }
    }

    // ========================================================================
    // VALIDACIÓN EN TIEMPO REAL
    // ========================================================================

    /**
     * Agrega validación en tiempo real a los campos
     */
    function agregarValidacionTiempoReal() {
        if (nombreInput) {
            nombreInput.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    if (!validarNombre(this.value.trim())) {
                        marcarCampoInvalido(this, 'El nombre debe tener al menos 3 caracteres y solo letras.');
                    } else {
                        marcarCampoValido(this);
                    }
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    if (!validarEmail(this.value.trim())) {
                        marcarCampoInvalido(this, 'Por favor, ingresa un correo electrónico válido.');
                    } else {
                        marcarCampoValido(this);
                    }
                }
            });
        }

        if (telefonoInput) {
            telefonoInput.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    if (!validarTelefono(this.value.trim())) {
                        marcarCampoInvalido(this, 'El teléfono debe tener entre 7 y 15 dígitos.');
                    } else {
                        marcarCampoValido(this);
                    }
                }
            });
        }

        if (asuntoSelect) {
            asuntoSelect.addEventListener('change', function() {
                if (this.value !== '') {
                    marcarCampoValido(this);
                }
            });
        }

        if (mensajeTextarea) {
            mensajeTextarea.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    if (this.value.trim().length < 10) {
                        marcarCampoInvalido(this, 'El mensaje debe tener al menos 10 caracteres.');
                    } else {
                        marcarCampoValido(this);
                    }
                }
            });
        }

        if (terminosCheckbox) {
            terminosCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    ocultarErrorCheckbox(this);
                }
            });
        }
    }

    // Inicializar validación en tiempo real
    agregarValidacionTiempoReal();

    // ========================================================================
    // INTERACTIVIDAD DE ELEMENTOS
    // ========================================================================

    /**
     * Agrega efectos hover a los iconos de información
     */
    function agregarEfectosIconos() {
        const iconos = ['iconDireccion', 'iconTelefono', 'iconEmail', 'iconHorario'];
        
        iconos.forEach(iconoId => {
            const icono = document.getElementById(iconoId);
            if (icono) {
                icono.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.2) rotate(5deg)';
                    this.style.transition = 'all 0.3s ease';
                });

                icono.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            }
        });
    }

    agregarEfectosIconos();

    /**
     * Agrega interactividad a los enlaces de redes sociales
     */
    function agregarInteractividadRedesSociales() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                const network = this.getAttribute('data-network');
                console.log(`Click en red social: ${network}`);
                
                // Aquí se puede agregar tracking analytics
                // ga('send', 'event', 'Social', 'click', network);
                
                // Efecto visual
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                // Mostrar alerta temporal (en producción, redireccionar a la red social)
                mostrarNotificacion(`Abriendo ${network.charAt(0).toUpperCase() + network.slice(1)}...`);
            });
        });
    }

    agregarInteractividadRedesSociales();

    /**
     * Agrega funcionalidad de acordeón a las FAQs
     */
    function inicializarFAQs() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                // Ocultar respuestas inicialmente
                answer.style.display = 'none';
                answer.style.maxHeight = '0';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.3s ease';
                
                // Agregar cursor pointer
                question.style.cursor = 'pointer';
                question.style.userSelect = 'none';
                
                // Event listener para toggle
                question.addEventListener('click', function() {
                    const estaAbierto = answer.style.display === 'block';
                    
                    if (estaAbierto) {
                        // Cerrar
                        answer.style.maxHeight = '0';
                        setTimeout(() => {
                            answer.style.display = 'none';
                        }, 300);
                        this.style.color = '';
                    } else {
                        // Abrir
                        answer.style.display = 'block';
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        this.style.color = '#e74c3c';
                    }
                    
                    console.log(`FAQ ${index + 1} ${estaAbierto ? 'cerrado' : 'abierto'}`);
                });
            }
        });
    }

    inicializarFAQs();

    /**
     * Agrega interactividad al mapa placeholder
     */
    function inicializarMapa() {
        const mapa = document.getElementById('mapa');
        
        if (mapa) {
            mapa.addEventListener('click', function() {
                console.log('Click en mapa - Abriendo Google Maps...');
                
                // En producción, esto abriría Google Maps con la dirección
                const direccion = encodeURIComponent('Calle falsa 123, Medellín, Antioquia, Colombia');
                const url = `https://www.google.com/maps/search/?api=1&query=${direccion}`;
                
                mostrarNotificacion('Abriendo mapa en nueva ventana...');
                
                // window.open(url, '_blank');
            });

            // Agregar efecto visual
            mapa.style.cursor = 'pointer';
            mapa.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'all 0.3s ease';
            });

            mapa.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }

    inicializarMapa();

    // ========================================================================
    // UTILIDADES
    // ========================================================================

    /**
     * Muestra una notificación temporal
     * @param {string} mensaje - Mensaje a mostrar
     */
    function mostrarNotificacion(mensaje) {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.textContent = mensaje;
        notificacion.style.position = 'fixed';
        notificacion.style.bottom = '20px';
        notificacion.style.right = '20px';
        notificacion.style.backgroundColor = '#2c3e50';
        notificacion.style.color = '#ffffff';
        notificacion.style.padding = '1rem 1.5rem';
        notificacion.style.borderRadius = '10px';
        notificacion.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        notificacion.style.zIndex = '9999';
        notificacion.style.opacity = '0';
        notificacion.style.transition = 'opacity 0.3s ease';

        document.body.appendChild(notificacion);

        // Animar entrada
        setTimeout(() => {
            notificacion.style.opacity = '1';
        }, 10);

        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }

    /**
     * Agrega animación de entrada a las secciones
     */
    function animarEntradaSecciones() {
        const container = document.querySelector('.container');
        
        if (container) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.8s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    animarEntradaSecciones();

    // ========================================================================
    // CONSOLE LOG INICIAL
    // ========================================================================

    console.log('==============================================');
    console.log('Página de contacto cargada exitosamente');
    console.log('La Belle Cuisine Restaurant');
    console.log('==============================================');

});

// ============================================================================
// FIN DEL ARCHIVO
// ============================================================================