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

            // Lógica para cambiar el href del botón del antefooter según la página
            const page = document.body.dataset.page;
            if (page === 'actividades') {
                const antefooterButton = document.querySelector('#antefooter-placeholder .btn');
                if (antefooterButton) {
                    antefooterButton.href = 'contacto.html';
                }
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
    } else if (page === 'cabañas') {
        const antefooterData = {
            title: 'Descubrí las imágenes de nuestras cabañas',
            images: [
                ['cabaña_costado.jpg', 'cabañas_lejos.jpg', 'nieve2.jpg', 'vista2.jpg'],
                ['nieve_frente.jpg', 'frente_cabaña.jpg', 'cama_noche.jpg', 'cama.jpg']
            ]
        };
        loadAntefooter (antefooterData);
    } else if (page === 'actividades') {
        const antefooterData = {
            title: 'Más aventuras en La Cuesta Glamping',
            images: [
                ['caida2.jpg', 'caba.jpg', 'desa.jpg', 'ciclista77.jpg'],
                ['nene.jpg', 'okey.jpg', 'vista_parapente.jpg', 'dique.jpg']
            ]
        };
        loadAntefooter (antefooterData);
    }

    // Lógica para que el carrusel avance al hacer clic
    const clickableCarousels = document.querySelectorAll('.clickable-carousel');
    clickableCarousels.forEach(carousel => {
        carousel.addEventListener('click', () => {
            const carouselInstance = new bootstrap.Carousel(carousel);
            carouselInstance.next();
        });
    })
});