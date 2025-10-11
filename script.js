const boxExplore = document.getElementById("boxExplore");

const API_KEY = "98a2f8979cmsh1e4f528f183d725p134240jsn1d1d818bfc5c";
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

  for (const book of books) {
    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookTitle = document.createElement("h3");
    bookImage.src = book.cover_image;
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

// const scrollLeftBooks = () => {
//   boxExplore.scrollBy({ left: -300, behavior: "smooth" });
// };

// const scrollRightBooks = () => {
//   boxExplore.scrollBy({ left: 300, behavior: "smooth" });
// };

// const hamburger = document.getElementById("hamburger");
// const navLinks = document.getElementById("nav-links");

// const navLinksList = document.querySelectorAll("#nav-links a");

// navLinksList.forEach((link) => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();

//     const targetId = this.getAttribute("href").substring(1);
//     const targetElement = document.getElementById(targetId);

//     if (targetElement) {
//       // Scrolla smidigt till sektionen
//       targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

//       // Lägg till highlight
//       targetElement.classList.add("highlight");

//       // Ta bort highlight efter 2 sekunder
//       setTimeout(() => {
//         targetElement.classList.remove("highlight");
//       }, 2000);

//       // Dölj dropdownmenyn
//       navLinks.classList.remove("active");
//     }
//   });
// });
