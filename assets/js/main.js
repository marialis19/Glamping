document.addEventListener("DOMContentLoaded", () => {
  // Función para cargar partials
  const loadPartial = (url, elementId, callback = () => {}) => {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        document.getElementById(elementId).innerHTML = html;
        callback();
      })
      .catch(error => console.error(`Error loading partial ${url}:`, error));
  };

  // Cargar Header y Footer
  loadPartial('partials/header.html', 'header-placeholder');
  loadPartial('partials/footer.html', 'footer-placeholder');

  // Cargar el antefooter (se necesita una lógica adicional)
  // Esta es la parte que cambia para cada página
  const page = document.body.dataset.page;

  // Lógica para el antefooter dinámico
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
  }

  // Función para cargar el antefooter con datos
  function loadAntefooter(data) {
    loadPartial('partials/antefooter.html', 'antefooter-placeholder', () => {
      document.getElementById('antefooterTitle').textContent = data.title;
      const carouselInner = document.getElementById('antefooterCarouselInner');
      carouselInner.innerHTML = ''; // Limpiar contenido

      data.images.forEach((slideImages, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        if (index === 0) slide.classList.add('active');

        const flexContainer = document.createElement('div');
        flexContainer.classList.add('d-flex', 'justify-content-center', 'gap-3');

        slideImages.forEach(imageName => {
          const img = document.createElement('img');
          img.src = `assets/img/${imageName}`;
          img.classList.add('img-card');
          img.alt = ''; // Puedes agregar un alt si lo deseas
          flexContainer.appendChild(img);
        });
        slide.appendChild(flexContainer);
        carouselInner.appendChild(slide);
      });
    });
  }
});