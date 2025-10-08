const boxExplore = document.getElementById("boxExplore")

// API

const API_KEY = "8ad64df3c0mshd5b7a83a018b82dp1d79bajsn9530cc086a66";
const API_URL =
  "https://project-gutenberg-free-books-api1.p.rapidapi.com/books";

const getBooks = async () => {
  const response = await fetch(API_URL, {
    headers: {
      "x-rapidapi-key": API_KEY,
    },
  });

  const parsedResponse = await response.json();

  const books = parsedResponse.results;

  console.log(books);

  return books;
};

getBooks()

const getBooksExplore = async () => {
  //Randomize
  const books = await getBooks();

  for (const book of books) {
    const title = book.title;
    const image = book.cover_image;

    const bookContainer = document.createElement("div");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = title;
    const bookImage = document.createElement("img");
    bookImage.src = image;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);
    boxExplore.appendChild(bookContainer);
  }
};

getBooksExplore()

const displayBooksExploreCarousel = async () => {
  const books = await getBooks();

  let books1 = [];
  let books2;

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
  const carousel = document.querySelector(".container-carousel");
  carousel.scrollBy({ left: carousel.offsetWidth, behavior: "smooth" });
};

const previousDiv = () => {
  const carousel = document.querySelector(".container-carousel");
  carousel.scrollBy({ left: -carousel.offsetWidth, behavior: "smooth" });
};

const scrollLeftBooks = () => {
  boxExplore.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRightBooks = () => {
  boxExplore.scrollBy({ left: 300, behavior: "smooth" });
};

// Other functionality

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
