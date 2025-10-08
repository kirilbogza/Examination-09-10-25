// API


// Buttons

const nextDiv = () => {
  const carousel = document.querySelector('.container-carousel');
  carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
};

const previousDiv = () => {
  const carousel = document.querySelector('.container-carousel');
  carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
};

const scrollLeftBooks = () => {
  containerExplore.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRightBooks = () => {
  containerExplore.scrollBy({ left: 300, behavior: "smooth" });
};

// Other functionality

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

displayBooksExplore();
displayBooksExploreCarousel();










