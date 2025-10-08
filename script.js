const boxExplore = document.getElementById("boxExplore");
const bookContent = document.getElementById("bookContent");
const themeBox1 = document.getElementById("theme-box-1");
const themeBox2 = document.getElementById("theme-box-2");
const themeBox3 = document.getElementById("theme-box-3");

// API

const API_KEY = "8ad64df3c0mshd5b7a83a018b82dp1d79bajsn9530cc086a66";
const API_URL =
  "https://project-gutenberg-free-books-api1.p.rapidapi.com/books";

// getBooks

const getDisplayBooks = async () => {
  // Fetch

  const response = await fetch(API_URL, {
    headers: {
      "x-rapidapi-key": API_KEY,
    },
  });

  const parsedResponse = await response.json();
  const books = parsedResponse.results;

  // Display books
  for (const book of books) {
    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    bookImage.src = book.cover_image;
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);
    boxExplore.appendChild(bookContainer);

    // Clickable

    bookContainer.style.cursor = "pointer";
    bookContainer.onclick = async function () {
      // Get book text
      const response = await fetch(
        `https://project-gutenberg-free-books-api1.p.rapidapi.com/books/${book.id}/text?cleaning_mode=simple`,
        {
          headers: { "x-rapidapi-key": API_KEY },
        }
      );
      const data = await response.json();

      // Window with text
      const bookWindow = window.open("", "_blank");
      bookWindow.document.write(`
        <html>
          <body>
            <button onclick="window.close()">Close</button>
            <div>${data.text}</div>
          </body>
        </html>
      `);
    };
  }
};

getDisplayBooks();

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
