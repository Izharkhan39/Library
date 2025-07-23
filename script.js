//Modal toggle Dom Elements
const addBookBtn = document.querySelector("#addBook");
const addBookModal = document.querySelector("#addBookModal");
const overlay = document.querySelector("#overlay");

//Modal toggle Event Listeners
addBookBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

//Modal fucntions
function openModal() {
  addBookModal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
}

const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookReadStatus = document.querySelector("#isRead");

const myLibrary = [];

function Book(id, title, author, pages, isRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();
  const pages = bookPages.value;
  const isRead = bookReadStatus.checked;
  const bookId = crypto.randomUUID();

  // Check if book already exists
  const isDuplicate = myLibrary.some((book) => book.title === title);

  if (isDuplicate) {
    alert("This book already exists in your library!");
    return;
  }

  const book = new Book(bookId, title, author, pages, isRead);
  myLibrary.push(book);
  addBookCard(book);
}

document.querySelector("#addBookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  addBookToLibrary();
  closeModal();
  document.querySelector("#addBookForm").reset();
});

function addBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.id = book.id;
  document.querySelector(".book-display-container").appendChild(bookCard);

  const bookCardTitle = document.createElement("div");
  bookCardTitle.classList.add("book-title");
  bookCardTitle.textContent = book.title;
  bookCard.appendChild(bookCardTitle);

  const bookCardAuthor = document.createElement("div");
  bookCardAuthor.classList.add("book-author");
  bookCardAuthor.textContent = book.author;
  bookCard.appendChild(bookCardAuthor);

  const bookCardPages = document.createElement("div");
  bookCardPages.classList.add("book-page");
  bookCardPages.textContent = book.pages;
  bookCard.appendChild(bookCardPages);

  const bookCardReadButton = document.createElement("button");
  bookCardReadButton.classList.add("readStatus");

  bookCardReadButton.addEventListener("click", () => {
    book.isRead = !book.isRead;

    if (book.isRead) {
      bookCardReadButton.textContent = "Read";
      bookCardReadButton.setAttribute(
        "style",
        "background-color: rgba(68, 232, 62, 0.58);"
      );
    } else {
      bookCardReadButton.textContent = "Not read";

      bookCardReadButton.textContent = "Not read";
      bookCardReadButton.setAttribute(
        "style",
        "background-color: rgba(232, 62, 62, 0.58);"
      );
    }
  });

  if (book.isRead) {
    bookCardReadButton.textContent = "Read";
    bookCardReadButton.setAttribute(
      "style",
      "background-color: rgba(68, 232, 62, 0.58);"
    );
  } else {
    bookCardReadButton.textContent = "Not read";
    bookCardReadButton.setAttribute(
      "style",
      "background-color: rgba(232, 62, 62, 0.58);"
    );
  }

  bookCard.appendChild(bookCardReadButton);

  const bookCardRemoveButton = document.createElement("button");
  bookCardRemoveButton.classList.add("removeBook");
  bookCardRemoveButton.textContent = "Remove";
  bookCard.appendChild(bookCardRemoveButton);

  bookCardRemoveButton.addEventListener("click", () => {
    document.querySelector(".book-display-container").removeChild(bookCard);
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id === bookCard.dataset.id) {
        myLibrary.splice(i, 1);
      }
    }
  });
}
