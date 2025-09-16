// Evento para la espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Obtener todos los botones de categoría
    const menuButtons = document.querySelectorAll('.menu-btn');
    //  Obetener las secciones del menú
    const menuSections = document.querySelectorAll('.menu-section');

    // Función para mostrar una sección específica del menú
    function showMenuSection(sectionId) {

        // Ocultamos la sección del menú
        menuSections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });

        // Función para mostrar la sección seleccionada
        const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.style.display = 'block';
                selectedSection.classList.add('active');
        }

        // Resaltar el botón activo
        menuButtons.forEach(button => {
            button.classList.remove('active');

            // Detectar si el ID corresponde a la sección seleccionada
            const expectedButtonId = `btn${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`;
            if (button.id === expectedButtonId) {
                button.classList.add('active');
            }
        });
    }

    // Eventos de botones.
    menuButtons.forEach(button => {

        button.addEventListener('click', function() {
            const sectionId = this.id.replace('btn', '').toLowerCase();
            showMenuSection(sectionId);        
        });
    });

    showMenuSection('all'); // Mostrar la sección "Todos" por defecto
    

});