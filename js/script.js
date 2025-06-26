// --- Global Variables (if any) ---
let currentTimeout = null;
let currentIsMobile = null;
let resizeTimeout; // For SVG update
let currentIndex = 0; // For service cards slider
const cards = document.querySelectorAll('.service-card'); // For service cards slider
const totalCards = cards.length; // For service cards slider
const navButtons = document.querySelectorAll('.nav-btn'); // For scroll animation buttons
const targetSection = document.getElementById('about'); // For scroll animation buttons


// --- Lottie Animation (Loading Overlay) ---
// Initialize Lottie animation
var animation = lottie.loadAnimation({
  container: document.getElementById('lottie-animation'), // The container for the animation
  renderer: 'svg', // Renderer type
  loop: true, // Set to true for infinite loop
  autoplay: true, // Set to true for automatic play
  path: 'img/assets/loadingg.json' // Path to your Lottie JSON animation
});

// Hide the loading overlay after the page is fully loaded
window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loading-overlay').style.display = 'none'; // Hide overlay after 1.5 seconds
  }, 500); // Adjust this delay as needed
});


// --- Intersection Observer for Scroll Animations ---
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Animate all UIUX-Content items
  document.querySelectorAll('.UIUX-Content .item').forEach(item => {
    observer.observe(item);
  });

  // Animate mockup images
  const mockups = ['#mockupImage', '#mockupImage2'];
  mockups.forEach(id => {
    const el = document.querySelector(id);
    if (el) observer.observe(el);
  });

  // Animate project boxes
  document.querySelectorAll(".project_box").forEach(box => {
    observer.observe(box);
  });
});


// --- Car Rental Image Switcher (Responsive) ---
function initializeImageSwitcher() {
  const imgElement = document.querySelector(".carRentImg");
  if (!imgElement) return;

  const imagesDesktop = ["img/carRentMockup1.png", "img/carRentMockup2.png"];
  const imagesMobile = ["img/carRentMockupMobile1.png", "img/carRentMockupMobile2.png"];

  const isMobile = window.innerWidth <= 550;

  // Avoid re-initializing if layout hasn't changed
  if (isMobile === currentIsMobile) return;
  currentIsMobile = isMobile;

  console.log("Switching layout. isMobile:", isMobile);

  const selectedImages = isMobile ? imagesMobile : imagesDesktop;

  const preloadedImages = selectedImages.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  let currentIndex = 0; // This currentIndex is local to the function

  function switchImage() {
    const nextIndex = 1 - currentIndex;
    const nextImage = preloadedImages[nextIndex];

    if (nextImage.complete) {
      imgElement.src = nextImage.src;
      currentIndex = nextIndex;
    }

    currentTimeout = setTimeout(switchImage, 1200);
  }

  // Clear any previous timeouts to avoid stacking
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  imgElement.src = preloadedImages[currentIndex].src;
  currentTimeout = setTimeout(switchImage, 1200);
}

window.addEventListener("resize", initializeImageSwitcher);
document.addEventListener("DOMContentLoaded", initializeImageSwitcher);


// --- SVG Background Update (Responsive) ---
function updateSVG() {
  let svgObject = document.querySelector(".main");
  if (!svgObject) return; // Ensure the element exists

  // Determine which SVG to load based on window width
  if (window.innerWidth <= 768) { // Order matters here, start with smallest if conditions overlap
    svgObject.setAttribute("data", "img/assets/top768.svg");
  } else if (window.innerWidth <= 1024) {
    svgObject.setAttribute("data", "img/assets/top1024.svg");
  } else if (window.innerWidth <= 1440) {
    svgObject.setAttribute("data", "img/assets/top1440.svg");
  } else {
    svgObject.setAttribute("data", "img/assets/top.svg");
  }

  // Reload the SVG by replacing the object tag
  let newObject = svgObject.cloneNode(true);
  svgObject.parentNode.replaceChild(newObject, svgObject);
}

// Event listener for window resize with debouncing
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateSVG, 200); // Run updateSVG after 200ms
});

// Initial call to set the correct SVG on page load
document.addEventListener("DOMContentLoaded", updateSVG);


// --- Social Links Menu Toggle ---
function toggleMenu() {
  const links = document.getElementById('socialLinks');
  if (links) { // Ensure the element exists
    links.classList.toggle('show');
  }
}


// --- Service Cards Slider ---
// Function to determine how many cards to show based on window width
function getCardsToShow() {
  if (window.innerWidth <= 768) {
    return 2; // Show 2 cards on smaller screens
  } else {
    return 3; // Show 3 cards on larger screens
  }
}

// Function to show the appropriate number of cards
function updateCardsDisplay() {
  const cardsToShow = getCardsToShow();
  cards.forEach((card, index) => {
    if (index >= currentIndex && index < currentIndex + cardsToShow) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Update button states (assuming prevBtn and nextBtn exist)
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) {
    if (currentIndex <= 0) {
      prevBtn.classList.remove('active');
    } else {
      prevBtn.classList.add('active');
    }
  }

  if (nextBtn) {
    if (currentIndex + cardsToShow >= totalCards) {
      nextBtn.classList.remove('active');
    } else {
      nextBtn.classList.add('active');
    }
  }
}

// Previous button click handler
document.getElementById('prevBtn')?.addEventListener('click', () => { // Using optional chaining for robustness
  const cardsToShow = getCardsToShow(); // Get the updated number of cards to display
  if (currentIndex > 0) {
    currentIndex -= cardsToShow;
    updateCardsDisplay();
  }
});

// Next button click handler
document.getElementById('nextBtn')?.addEventListener('click', () => { // Using optional chaining for robustness
  const cardsToShow = getCardsToShow(); // Get the updated number of cards to display
  if (currentIndex + cardsToShow < totalCards) {
    currentIndex += cardsToShow;
    updateCardsDisplay();
  }
});

// Initial display setup
document.addEventListener("DOMContentLoaded", updateCardsDisplay);

// Update the card display when window is resized
window.addEventListener('resize', updateCardsDisplay);


// --- Navigation Button Visibility on Scroll ---
function checkVisibility() {
  if (!targetSection) return; // Ensure the target section exists

  const rect = targetSection.getBoundingClientRect();
  const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;

  navButtons.forEach(btn => {
    btn.style.opacity = isInView ? '1' : '0';
    btn.style.pointerEvents = isInView ? 'auto' : 'none';
  });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


// --- QTech Mockup Image and Text Update (Responsive) ---
function updateMockupImage() {
  const obj = document.getElementById('mockupImage');
  const obj2 = document.getElementById('mockupImage2');
  const qTech = document.querySelector('.qTech-description');

  if (!obj || !obj2 || !qTech) return; // Ensure all elements exist

  if (window.innerWidth <= 550) {
    obj.data = "img/assets/desktop projects_mob.svg"; // Your alternative SVG
    obj2.data = "img/assets/QTechMockup2_mob.svg";
    qTech.textContent = 'QTech is a sleek e-commerce app for PC hardware with responsive design, secure login, and powerful admin features.';
  } else {
    obj.data = "img/assets/QTechMockup.svg";
    obj2.data = "img/assets/QTechMockup2.svg";
    qTech.textContent = 'QTech is a sleek e-commerce app for high-end PC hardware, offering a responsive design, secure login,product management, and a powerful admin panel—all built with a modern tech stack.';
  }
}

// Initial check
document.addEventListener("DOMContentLoaded", updateMockupImage);

// Update on resize
window.addEventListener('resize', updateMockupImage);


// --- Swiper Initialization (Commented Out) ---
// If you uncomment this, make sure Swiper library is properly included.
// const featuresSwiper = new Swiper('.features-swiper', {
//   slidesPerView: 3,
//   spaceBetween: 30,
//   loop: true,
//   slidesPerGroup: 1,
//   navigation: {
//     nextEl: '.features-swiper-button-next-feature',
//     prevEl: '.features-swiper-button-prev-feature',
//   },
//   breakpoints: {
//     0: { slidesPerView: 1 },
//     768: { slidesPerView: 2 },
//     1024: { slidesPerView: 3 }
//   }
// });