// API

const API_KEY = "8ad64df3c0mshd5b7a83a018b82dp1d79bajsn9530cc086a66"
const API_URL = "https://www.dbooks.org/api/recent";

const containerExplore = document.getElementById("boxExplore");
const carousel1 = document.getElementById("carousel-1");
const carousel2 = document.getElementById("carousel-2");
const carousel3 = document.getElementById("carousel-3");

const getBooks = async () => {
  const response = await fetch(API_URL, {
    headers: {
      "x-rapidapi-key": API_KEY
    }
  });

  const parsedResponse = await response.json();

  const books = parsedResponse.books;

  console.log(books);

  return books;
};

const displayBooksExplore = async () => { //Randomize
  const books = await getBooks();

  for (const book of books) {
    const title = book.title;
    const image = book.image;

    const bookContainer = document.createElement("div");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = title;
    const bookImage = document.createElement("img");
    bookImage.src = image;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);
    containerExplore.appendChild(bookContainer);
  }
};

const displayBooksExploreCarousel = async () => {
  const books = await getBooks();

  let books1 = []
  let books2

  for (let i = 0; i < 3 && i < books.length; i++) {
    const book = books[i];
    const image = book.image;

    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    
    bookImage.src = image;
    bookContainer.classList.add("item");
    bookContainer.appendChild(bookImage);

    carousel1.appendChild(bookContainer.cloneNode(true));
    carousel2.appendChild(bookContainer.cloneNode(true));
    carousel3.appendChild(bookContainer.cloneNode(true));
  }

};

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










