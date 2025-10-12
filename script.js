const boxExplore = document.getElementById("boxExplore");
const containerFeed = document.getElementById("containerFeed");

const API_KEY = "5734ab48e9mshf26bca6a6b91ff5p159558jsna2026a798088";
const API_URL =
  "https://project-gutenberg-free-books-api1.p.rapidapi.com/books";

async function getBooks() {
  const response = await fetch(API_URL, {
    headers: {
      "x-rapidapi-key": API_KEY,
    },
  });

  const parsedResponse = await response.json();
  const books = parsedResponse.results;
  return books;
}

async function displayBooks() {
  const books = await getBooks();
  const containers = [];

  const clonedBooks = [...books];

  const shuffled = books.sort(() => Math.random() - 0.5);
  const selectedBooks = shuffled.slice(0, 1);

  // Feed
  for (const book of selectedBooks) {
    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookTitle = document.createElement("h3");

    bookImage.src = book.cover_image;
    bookImage.alt = book.title || "Book cover";
    bookTitle.textContent = book.title;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);

    containerFeed.appendChild(bookContainer);

    bookContainer.style.cursor = "pointer";
    bookContainer.onclick = async function () {
      const response = await fetch(
        `https://project-gutenberg-free-books-api1.p.rapidapi.com/books/${book.id}/text?cleaning_mode=simple`,
        {
          headers: { "x-rapidapi-key": API_KEY },
        }
      );
      const data = await response.json();
      localStorage.setItem("bookText", data.text);
      window.open("book.html", "_blank");
    };
  }

  // Explore
  for (const book of clonedBooks) {
    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookTitle = document.createElement("h3");

    bookImage.src = book.cover_image;
    bookImage.alt = book.title || "Book cover";
    bookTitle.textContent = book.title;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);

    boxExplore.appendChild(bookContainer);
    containers.push(bookContainer);
  }
  return containers;
}

async function bookClick() {
  const books = await getBooks();
  const containers = await displayBooks();

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];
    const book = books[i];

    container.style.cursor = "pointer";

    container.onclick = async function () {
      const textPromise = await fetch(
        `https://project-gutenberg-free-books-api1.p.rapidapi.com/books/${book.id}/text?cleaning_mode=simple`,
        {
          headers: { "x-rapidapi-key": API_KEY },
        }
      );

      const data = await textPromise.json();

      localStorage.setItem("bookText", data.text);
      window.open("book.html", "_blank");
    };
  }
}

bookClick();

const scrollLeftBooks = () => boxExplore.scrollBy({ left:-300, behavior:"smooth" });
const scrollRightBooks = () => boxExplore.scrollBy({ left:300, behavior:"smooth" });

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");


const links = navLinks.querySelectorAll("a");

hamburger.addEventListener("click", () => navLinks.classList.toggle("show"));

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    navLinks.classList.remove("show");
    const target = document.querySelector(link.getAttribute("href"));
    target?.scrollIntoView({behavior:"smooth"});
  });
});
