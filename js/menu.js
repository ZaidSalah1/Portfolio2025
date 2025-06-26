const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('#mobileMenu a'); // Select all anchor tags within the mobile menu
const floatMenu = document.querySelector('.floatMenu');


// Function to close the menu
function closeMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
  document.body.classList.add('no-scroll'); // Prevents background scrolling
});

menuOverlay.addEventListener('click', () => {
  closeMenu(); // Use the closeMenu function
});

floatMenu.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
  document.body.classList.add('no-scroll');
})

// Add event listener to each menu link
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu(); // Close the menu when a link is clicked
  });
});

