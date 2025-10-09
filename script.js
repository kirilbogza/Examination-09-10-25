const boxExplore = document.getElementById("boxExplore");
const bookContent = document.getElementById("bookContent");
const themeBox1 = document.getElementById("theme-box-1");
const themeBox2 = document.getElementById("theme-box-2");
const themeBox3 = document.getElementById("theme-box-3");

// API

const API_KEY = "98a2f8979cmsh1e4f528f183d725p134240jsn1d1d818bfc5c";
const API_URL =
  "https://project-gutenberg-free-books-api1.p.rapidapi.com/books";

// getBooks

const getDisplayBooks = async () => {

  const response = await fetch(API_URL, {
    headers: {
      "x-rapidapi-key": API_KEY,
    },
  });

  const parsedResponse = await response.json();
  const books = parsedResponse.results;

  for (const book of books) {
    const bookContainer = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookTitle = document.createElement("h3");
    bookImage.src = book.cover_image;
    bookTitle.textContent = book.title;

    bookContainer.appendChild(bookImage);
    bookContainer.appendChild(bookTitle);
    boxExplore.appendChild(bookContainer);


    bookContainer.style.cursor = "pointer";
    bookContainer.onclick = async function () {
      

    const response = await fetch(
        `https://project-gutenberg-free-books-api1.p.rapidapi.com/books/${book.id}/text?cleaning_mode=simple`,
        {
          headers: { "x-rapidapi-key": API_KEY },
        }
      );
      const data = await response.json();

      const bookWindow = window.open("", "_blank");
      bookWindow.document.write(`
      <html>
        <head>
          <style>
            body { 
            font-family: Arial;
            margin: 20px;
            background: #f5f5f5;
            }
            button {
            padding: 10px 20px;
            background: #973838;
            color: white;
            border: none;
            cursor: pointer;
            margin-bottom: 20px;
            }
            div {
            background: white;
            padding: 20px;
            border-radius: 5px;
            line-height: 1.6;
            white-space: pre-wrap;
            max-height: 80vh;
            overflow-y: auto;
            }
         </style>
       </head>
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

// const nextDiv = () => {
//   const carousel = document.querySelector(".container-carousel");
//   carousel.scrollBy({ left: carousel.offsetWidth, behavior: "smooth" });
// };

// const previousDiv = () => {
//   const carousel = document.querySelector(".container-carousel");
//   carousel.scrollBy({ left: -carousel.offsetWidth, behavior: "smooth" });
// };

const scrollLeftBooks = () => {
  boxExplore.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRightBooks = () => {
  boxExplore.scrollBy({ left: 300, behavior: "smooth" });
};

// Other functionality

// const hamburger = document.getElementById("hamburger");
// const navLinks = document.getElementById("nav-links");



// const navLinksList = document.querySelectorAll("#nav-links a");

// navLinksList.forEach(link => {
//   link.addEventListener("click", function(e) {
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