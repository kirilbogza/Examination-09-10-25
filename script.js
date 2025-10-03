const API_URL = "https://www.dbooks.org/api/recent";

const containerExplore = document.getElementById("containerExplore");

const getBooks = async () => {
  const response = await fetch(API_URL);

  const parsedResponse = await response.json();

  const books = parsedResponse.books;

  console.log(books);

  return books;
};

const displayBooks = async () => {
  const books = await getBooks();

  for(const book of books) {

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

displayBooks();

const scrollLeftBooks = () => {
  containerExplore.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRightBooks = () => {
  containerExplore.scrollBy({ left: 300, behavior: "smooth" });
};