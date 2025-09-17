// Evento para la espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Obtener todos los botones de categoría
    const menuButtons = document.querySelectorAll('.menu-btn');
    // Obtener las secciones del menú
    const menuSections = document.querySelectorAll('.menu-section');

    // Función para mostrar una sección específica del menú
    function showMenuSection(category) {

        // Remover clase activa de todos los botones
        menuButtons.forEach(button => {
            button.classList.remove('active');
        });

        if (category === 'all') {
            // Mostrar todas las secciones
            menuSections.forEach(section => {
                section.style.display = 'block';
                section.classList.add('active');
            });
            
            // Activar el botón "Todos"
            const allButton = document.getElementById('btnAll');
            if (allButton) {
                allButton.classList.add('active');
            }
            
        } else {
            // Ocultar todas las secciones primero
            menuSections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });

            // Mostrar la sección seleccionada
            let sectionToShow = null;
            
            // Mapear las categorías a los IDs correctos
            switch(category) {
                case 'entradas':
                    sectionToShow = document.getElementById('entradas');
                    break;
                case 'platos-fuertes':
                    sectionToShow = document.getElementById('platos-fuertes');
                    break;
                case 'postres':
                    sectionToShow = document.getElementById('postres');
                    break;
                case 'bebidas':
                    sectionToShow = document.getElementById('bebidas');
                    break;
                default:
                    // Si no encuentra la categoría, intenta una conversión alternativa
                    const alternativeId = category.replace(/-([a-z])/g, function(match, letter) {
                        return letter.toUpperCase();
                    });
                    sectionToShow = document.getElementById(alternativeId);
                    break;
            }

            if (sectionToShow) {
                sectionToShow.style.display = 'block';
                sectionToShow.classList.add('active');
            }

            // Activar el botón correspondiente
            const activeButton = document.querySelector(`[data-category="${category}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
    }

    // Eventos de botones
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showMenuSection(category);
        });
    });

    // Mostrar todas las secciones por defecto al cargar la página
    showMenuSection('all');
});