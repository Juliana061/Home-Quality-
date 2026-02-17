// ===== Header Scroll Effect =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = mobileMenuBtn.querySelector('.hamburger');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Special Offer Banner - Discount Button =====
const offerBanner = document.getElementById('btnDescuento');
if (offerBanner) {
  offerBanner.addEventListener('click', () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      alert('🎉 Your 40% discount has been applied! Book any service below to redeem it.');
    }, 600);
  });
}

// ===== Gallery Carousel =====
const galleryImages = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo4.jpg',
  'images/photo5.jpg',
  'images/photo6.jpg',
  'images/photo7.jpg',
  'images/photo8.jpg',
  'images/photo9.jpg',
  'images/photo10.jpg',
  'images/photo11.jpg',
  'images/photo12.jpg',
  'images/photo13.jpg',
  'images/photo14.jpg',
  'images/photo15.jpg',
  'images/photo17.jpg',
];

let currentImageIndex = 0;
const mainImage = document.getElementById('mainImage');
const thumbnailsContainer = document.getElementById('thumbnails');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Generate thumbnails
function generateThumbnails() {
  galleryImages.forEach((src, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
    thumbnail.innerHTML = `<img src="${src}" alt="Gallery image ${index + 1}">`;
    thumbnail.addEventListener('click', () => goToImage(index));
    thumbnailsContainer.appendChild(thumbnail);
  });
}

// Go to specific image
function goToImage(index) {
  currentImageIndex = index;
  updateCarousel();
}

// Update carousel display
function updateCarousel() {
  // Update main image with fade effect
  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = galleryImages[currentImageIndex];
    mainImage.style.opacity = '1';
  }, 150);
  
  // Update thumbnails
  const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb, index) => {
    if (index === currentImageIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Previous image
function prevImage() {
  currentImageIndex = currentImageIndex === 0 
    ? galleryImages.length - 1 
    : currentImageIndex - 1;
  updateCarousel();
}

// Next image
function nextImage() {
  currentImageIndex = currentImageIndex === galleryImages.length - 1 
    ? 0 
    : currentImageIndex + 1;
  updateCarousel();
}

// Event listeners for carousel
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
});

// Initialize carousel
generateThumbnails();

// ===== Intersection Observer for Animations =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .service-card').forEach(el => {
  observer.observe(el);
});