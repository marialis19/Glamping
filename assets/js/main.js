document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar partials
    const loadPartial = (url, elementId, callback = () => {}) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = html;
                    callback();
                } else {
                    console.error(`Element with ID '${elementId}' not found.`);
                }
            })
            .catch(error => console.error(`Error loading partial ${url}:`, error));
    };

    // Función para cargar el antefooter con datos
    function loadAntefooter(data) {
        loadPartial('../partials/antefooter.html', 'antefooter-placeholder', () => {
            const antefooterTitle = document.getElementById('antefooterTitle');
            if (antefooterTitle) {
                antefooterTitle.textContent = data.title;
            }
            const carouselInner = document.getElementById('antefooterCarouselInner');
            if (carouselInner) {
                carouselInner.innerHTML = '';

                data.images.forEach((slideImages, index) => {
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-item');
                    if (index === 0) slide.classList.add('active');

                    const flexContainer = document.createElement('div');
                    flexContainer.classList.add('d-flex', 'justify-content-center', 'gap-3');

                    slideImages.forEach(imageName => {
                        const img = document.createElement('img');
                        img.src = `../assets/img/${imageName}`;
                        img.classList.add('img-card');
                        img.alt = '';
                        flexContainer.appendChild(img);
                    });
                    slide.appendChild(flexContainer);
                    carouselInner.appendChild(slide);
                });
            }
        });
    }

    // Cargar Header y Footer
    loadPartial('../partials/header.html', 'header-placeholder');
    loadPartial('../partials/footer.html', 'footer-placeholder');

    // Lógica para el antefooter dinámico
    const page = document.body.dataset.page;
    if (page === 'index') {
        const antefooterData = {
            title: 'Descubrí lo que te espera: Momentos inolvidables!',
            images: [
                ['silla_pica.jpg', 'plan_disfrute.jpg', 'fuego_vino.jpg', 'mate2.jpg'],
                ['fogon_externo.jpg', 'ciclista77.jpg', 'chica_sentada.jpg', 'disfrute22.jpg']
            ]
        };
        loadAntefooter(antefooterData);
    } else if (page === 'contacto') {
        const antefooterData = {
            title: 'Descubrí lugares recomendados',
            images: [
                ['cupula2.jpg', 'balneario.jpg', 'dique.jpg', 'parque.jpg'],
                ['iglesia.jpg', 'arroyo.jpg', 'laberinto.jpg', 'ollas.jpg']
            ]
        };
        loadAntefooter(antefooterData);
    } else if (page === 'nosotros') {
        const antefooterData = {
            title: 'Descubrí lo que te espera: Momentos inolvidables!',
            images: [
                ['lacues.jpg', 'fuego_vino.jpg', 'brindis.jpg', 'picadita.jpg'],
                ['vista_fuera.jpg', 'piedras.jpg', 'conexion.jpg', 'minacla.jpg']
            ]
        };
        loadAntefooter(antefooterData);
    }

    // Lógica para que el carrusel avance al hacer clic
    const carouselNosotros = document.getElementById('nosotrosCarousel');
    if (carouselNosotros) {
        carouselNosotros.addEventListener('click', () => {
            const carouselInstance = new bootstrap.Carousel(carouselNosotros);
            carouselInstance.next();
        });
    }
});