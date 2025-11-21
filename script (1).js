// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========== FILTRADO DE PROYECTOS ==========
const filterBtns = document.querySelectorAll(".filter-btn");
const proyectoCards = document.querySelectorAll(".proyecto-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remover clase active de todos los botones
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Añadir clase active al botón clickeado
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    proyectoCards.forEach((card) => {
      if (filterValue === "all") {
        card.classList.remove("hidden");
        card.style.display = "";
      } else {
        const cardCategory = card.getAttribute("data-category");
        if (cardCategory === filterValue) {
          card.classList.remove("hidden");
          card.style.display = "";
        } else {
          card.classList.add("hidden");
          card.style.display = "none";
        }
      }
    });
  });
});

// ========== INTERSECTION OBSERVER PARA ANIMACIONES ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos
document.querySelectorAll(".proyecto-card, .ilustracion-card, .sobremi-content").forEach((el) => {
  observer.observe(el);
});

// ========== VALIDACIÓN DE FORMULARIO ==========
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validación básica
    if (!nombre || !email || !mensaje) {
      alert("Por favor, completa todos los campos");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un email válido");
      return;
    }

    // Si todo es válido, mostrar mensaje de éxito
    alert("¡Gracias por tu mensaje! Me contactaré pronto.");
    contactForm.reset();

    // En un proyecto real, aquí se enviaría el formulario a un servidor
  });
}

// ========== AÑADIR EFECTO AL NAVBAR AL HACER SCROLL ==========
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 50) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== INICIALIZAR ANIMACIONES EN CARGA ==========
document.addEventListener("DOMContentLoaded", () => {
  // Pequeño delay para asegurar que todo esté renderizado
  setTimeout(() => {
    document.querySelectorAll('[style*="animation"]').forEach((el) => {
      el.style.opacity = "1";
    });
  }, 100);
});

/* ===========================
   LIGHTBOX AVANZADO
   =========================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const btnClose = document.querySelector(".lightbox-close");
const btnNext = document.querySelector(".lightbox-next");
const btnPrev = document.querySelector(".lightbox-prev");

let currentIndex = 0;
let lightboxImages = [];

// Detectar si estamos en la página Ilustraciones
const isIlustraciones = document.querySelector('main.proyecto-ilustraciones') !== null;

// Seleccionar imágenes según la página
let galleryImgs;
if (isIlustraciones) {
  galleryImgs = document.querySelectorAll(".galeria-ilustraciones img");
} else {
  galleryImgs = document.querySelectorAll(".galeria img, .proyecto-gallery-preview img");
}

// Guardamos los src en el array
galleryImgs.forEach((img, index) => {
  lightboxImages.push(img.src);

  img.addEventListener("click", () => {
    currentIndex = index;
    openLightbox(lightboxImages[currentIndex]);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightboxImg.style.transform = "scale(1)";
  lightboxImg.dataset.scale = 1;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

// Flechas
function nextImage() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentIndex];
}

function prevImage() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentIndex];
}

btnNext.addEventListener("click", nextImage);
btnPrev.addEventListener("click", prevImage);
btnClose.addEventListener("click", closeLightbox);

// Click afuera cierra
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Zoom con rueda
lightboxImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  let scale = parseFloat(lightboxImg.dataset.scale || 1);
  scale += e.deltaY * -0.0015;
  scale = Math.min(Math.max(1, scale), 4);
  lightboxImg.style.transform = `scale(${scale})`;
  lightboxImg.dataset.scale = scale;
});

// Teclado: ESC, ←, →
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }
});
const track = document.querySelector('.carrusel-track');
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');
const imgs = document.querySelectorAll('.carrusel-img');

let index = 0;
const imgWidth = imgs[0].offsetWidth + 16; // ancho + gap
const totalImgs = imgs.length;

function moverCarrusel() {
    index++;
    if(index > totalImgs - 3) index = 0; // muestra 3 imágenes a la vez
    track.style.transform = `translateX(-${index * imgWidth}px)`;
}

// ===== CARRUSEL + LIGHTBOX PARA SEÑALÉTICA =====
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carrusel-track');
    const imgs = document.querySelectorAll('.carrusel-img');
    const prevBtn = document.querySelector('.carrusel-btn.prev');
    const nextBtn = document.querySelector('.carrusel-btn.next');

    let index = 0;

    function updateCarrusel() {
        const width = imgs[0].clientWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % imgs.length;
        updateCarrusel();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + imgs.length) % imgs.length;
        updateCarrusel();
    });

    // autoplay cada 3 segundos
    setInterval(() => {
        index = (index + 1) % imgs.length;
        updateCarrusel();
    }, 3000);

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lbClose = document.querySelector('.lightbox-close');
    const lbNext = document.querySelector('.lightbox-next');
    const lbPrev = document.querySelector('.lightbox-prev');
    let lbIndex = 0;

    imgs.forEach((img, i) => {
        img.addEventListener('click', () => {
            lbIndex = i;
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });

    function showLightboxImg() {
        lightboxImg.src = imgs[lbIndex].src;
    }

    lbNext.addEventListener('click', () => {
        lbIndex = (lbIndex + 1) % imgs.length;
        showLightboxImg();
    });

    lbPrev.addEventListener('click', () => {
        lbIndex = (lbIndex - 1 + imgs.length) % imgs.length;
        showLightboxImg();
    });

    lbClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.style.display = 'none';
    });
});









