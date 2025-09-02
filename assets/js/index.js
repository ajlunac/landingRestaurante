// Evento a espera de la carga del documento completo.
        document.addEventListener('DOMContentLoaded', function() {

            // Arreglo de los testimonios con cita y autores.
            const testimonials = [
                { quote: "La experiencia en La Belle Cuisini fue inolvidable. Cada plato era una obra de arte culinaria, y el servicio impecable. ¡Definitivamente volveré!", author: "María G." },
                { quote: "Desde la entrada hasta el postre, todo fue perfecto. La atención al detalle y la calidad de los ingredientes hicieron que nuestra cena fuera excepcional.", author: "Carlos R." },
                { quote: "Un lugar encantador con un ambiente acogedor. La comida superó todas mis expectativas, y el personal fue muy atento. ¡Recomendado al 100%!", author: "Ana L." },
                { quote: "Cada bocado en La Belle Cuisini es una explosión de sabores. La creatividad del chef es impresionante, y la presentación de los platos es impecable.", author: "Javier M." },
            ];

            // Índice actual para el testimonio.
            let currentTestimonialIndex = 0;

            // Referencia a los elementos del DOM.
            const testimonialContainer = document.getElementById('testimonialContainer');
            const prevButton = document.getElementById('prevTestimonial');
            const nextButton = document.getElementById('nextTestimonial');

            // Función que muestre el testimonio según el índice.
            function showTestimonial(index) {
                const testimonial = testimonials[index];
                testimonialContainer.innerHTML = `
                    <blockquote>${testimonial.quote}</blockquote>
                    <cite>- ${testimonial.author}</cite>
                `;
            }

            // Configuración de los botones para navegar entre testimonios.
            if (prevButton && nextButton) {
                
                prevButton.addEventListener('click', function() {
                    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
                    showTestimonial(currentTestimonialIndex);
                });

                nextButton.addEventListener('click', function() {
                    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                    showTestimonial(currentTestimonialIndex);
                });

                // Si el contenedor existe, mostrar el primer testimonio.
                if (testimonialContainer) {
                    showTestimonial(currentTestimonialIndex); // Testimonio 0

                    // Cambio el testimonio cada 7 segundos.
                    setInterval(function() {
                        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                        showTestimonial(currentTestimonialIndex);
                    }, 7000);
                }  
            }

            // Efectos visuales para botones de reserva
            const reservaBtn = document.getElementById('btnReservar');
            if (reservaBtn) {
                reservaBtn.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '#e74c3c';
                });

                reservaBtn.addEventListener('click', function() {
                    window.location.href = 'reservaciones.html';
                });
            }

            // Estilos para los enlaces.
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', function() {
                    this.style.color = '#e74c3c';
                });
                link.addEventListener('mouseleave', function() {
                    this.style.color = '';
                });
            });

        });