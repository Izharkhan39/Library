const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookReadStatus = document.querySelector("#isRead");

// const myLibrary = [];

class Book {
  constructor(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
  }
  //Stores user input into variables and returns book object
  setBookPropertyValues() {
    const bookId = crypto.randomUUID();
    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const pages = bookPages.value;
    const isRead = bookReadStatus.checked;

    return new Book(bookId, title, author, pages, isRead);
  }

  //Adds book to myLibrary
  addBookToLibrary() {
    const book = this.setBookPropertyValues();

    if (this.isDuplicate(book)) {
      alert("This book already exists in your library!");
      return;
    }

    this.myLibrary.push(book);
    this.addBookCard(book);
  }

  //Remove book from library
  removeBookFromLibrary(book) {
    for (let i = 0; i < this.myLibrary.length; i++) {
      if (this.myLibrary[i].id === book.dataset.id) {
        this.myLibrary.splice(i, 1);
      }
    }
  }

  //Checks for duplicates book titles
  isDuplicate(book) {
    return this.myLibrary.some((b) => b.title === book.title);
  }

  createElementWithClass(tag, className, textContent, parentElement) {
    const elementName = document.createElement(tag);
    elementName.classList.add(className);
    if (textContent) elementName.textContent = textContent;
    parentElement.appendChild(elementName);
    return elementName;
  }

  addBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;
    document.querySelector(".book-display-container").appendChild(bookCard);

    //Book Title element
    const bookCardTitle = this.createElementWithClass(
      "div",
      "book-title",
      book.title,
      bookCard
    );

    //Book Author element
    const bookCardAuthor = this.createElementWithClass(
      "div",
      "book-author",
      book.author,
      bookCard
    );

    //Book Pages element
    const bookCardPages = this.createElementWithClass(
      "div",
      "book-page",
      book.pages,
      bookCard
    );

    //Book ReadStatusButton element
    const bookCardReadButton = this.createElementWithClass(
      "button",
      "readStatus",
      "",
      bookCard
    );

    this.setReadStatus(book, bookCardReadButton);
    bookCardReadButton.addEventListener("click", () => {
      book.toggleReadStatus();
      this.setReadStatus(book, bookCardReadButton);
    });

    //Book remove element
    const bookCardRemoveButton = this.createElementWithClass(
      "button",
      "removeBook",
      "Remove",
      bookCard
    );

    bookCardRemoveButton.addEventListener("click", () => {
      document.querySelector(".book-display-container").removeChild(bookCard);
      this.removeBookFromLibrary(bookCard);
    });
  }

  setReadStatus(book, bookReadStatusBtn) {
    if (book.isRead) {
      bookReadStatusBtn.textContent = "Read";

      bookReadStatusBtn.setAttribute(
        "style",
        "background-color: rgba(68, 232, 62, 0.58);"
      );
    } else {
      bookReadStatusBtn.textContent = "Not read";

      bookReadStatusBtn.setAttribute(
        "style",
        "background-color: rgba(232, 62, 62, 0.58);"
      );
    }
  }
}
//Global library object
const lib = new Library();

document.querySelector("#addBookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  lib.addBookToLibrary();
  resetForm();
});

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

function resetForm() {
  closeModal();
  document.querySelector("#addBookForm").reset();
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");

const titleError = document.querySelector("#title + span.titleError");
const authorError = document.querySelector("#author + span.authorError");
const pagesError = document.querySelector("#pages + span.pagesError");

title.addEventListener("input", (event) => {
  validateField(title, titleError, "You need to enter title off the book");
});
author.addEventListener("input", (event) => {
  validateField(author, authorError, "You need to enter author's name");
});
pages.addEventListener("input", (event) => {
  validateField(pages, pagesError, "You need to enter number of pages");
});

function validateField(input, errorSpan, message) {
  if (input.validity.valid) {
    errorSpan.textContent = "";
    errorSpan.classList.remove("active");
  } else if (input.validity.valueMissing) {
    errorSpan.textContent = message;
    errorSpan.classList.add("active");
  }
}
