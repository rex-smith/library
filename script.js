// Select DOM elements from HTML

const libraryContainer = document.querySelector("#library-container");
const newBookForm = document.querySelector("#new-book-form");
const showFormButton = document.querySelector("#show-form-button");

// Library Class
class Library {
  constructor() {
    this.bookArray = [];
  }

  addBookToLibrary(book) {
    this.bookArray.push(book);
    this.newBookCard(book);
  }

  newBookCard(book) {
    let newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.id = String(book.title);
    let newBookCardTitle = document.createElement("h2");

    // Adding in book card's information
    newBookCardTitle.innerHTML = book.title;
    newBookCard.appendChild(newBookCardTitle);

    let newBookCardAuthor = document.createElement("h3");
    newBookCardAuthor.innerHTML = `by ${book.author}`;
    newBookCard.appendChild(newBookCardAuthor);

    let newBookCardPages = document.createElement("p");
    newBookCardPages.innerHTML = `${book.pages} pages`;
    newBookCard.appendChild(newBookCardPages);

    let newBookCardRead = document.createElement("p");
    newBookCardRead.innerHTML = book.read ? "Read" : "Not read yet";
    newBookCard.appendChild(newBookCardRead);

    let newBookCardReadButton = document.createElement("button");
    newBookCardReadButton.classList.add("button", "button-read");
    newBookCardReadButton.innerHTML = book.read
      ? "Mark as unread"
      : "Mark as read";
    newBookCardReadButton.addEventListener("click", () => {
      book.toggleRead();
      newBookCardRead.innerHTML = book.read ? "Read" : "Not read yet";
      newBookCardReadButton.innerHTML = book.read
        ? "Mark as unread"
        : "Mark as read";
    });

    newBookCard.appendChild(newBookCardReadButton);

    // Delete Book Button
    let deleteBookButton = document.createElement("button");
    deleteBookButton.innerHTML = "Remove Book";
    deleteBookButton.classList.add("button", "button-delete");
    deleteBookButton.addEventListener("click", () => {
      bookArray.splice(bookArray.indexOf(book), 1);
      libraryContainer.removeChild(newBookCard);
    });
    newBookCard.appendChild(deleteBookButton);

    // Append book card to library container
    libraryContainer.appendChild(newBookCard);
  }
}

// Book Class

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
  }

  toggleRead = () => {
    this.read = !this.read;
  };
}

// Setup of initial library
let myLibrary = new Library();

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
myLibrary.addBookToLibrary(theHobbit);

let annaKarenina = new Book("Anna Karenina", "Leo Tolstoy", 600, true);
myLibrary.addBookToLibrary(annaKarenina);

let warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1200, false);
myLibrary.addBookToLibrary(warAndPeace);

let theGreatGatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  180,
  true
);
myLibrary.addBookToLibrary(theGreatGatsby);

let ulysses = new Book("Ulysses", "James Joyce", 730, false);
myLibrary.addBookToLibrary(ulysses);

// Toggle to Show New Book Form

showFormButton.addEventListener("click", () => {
  newBookForm.classList.toggle("hidden");
  showFormButton.classList.toggle("hidden");
});

// Validation for New Book Form

// Select input fields (not "read" checkbox since no potential errors)
const titleInput = document.querySelector("#title-input");
const titleError = document.querySelector("#title-input + span.error");
const authorInput = document.querySelector("#author-input");
const authorError = document.querySelector("#author-input + span.error");
const pagesInput = document.querySelector("#pages-input");
const pagesError = document.querySelector("#pages-input + span.error");

// Title Validation

function validateTitle() {
  if (titleInput.validity.valid) {
    titleError.textContent = "";
    titleInput.setCustomValidity("");
    titleError.className = "error";
  } else {
    showTitleError();
  }
}

titleInput.addEventListener("input", () => {
  validateTitle();
});

function showTitleError() {
  if (titleInput.validity.valueMissing) {
    titleError.textContent = "Title is required";
  }
  titleError.className = "error active";
}

// Author Validation

function validateAuthor() {
  if (authorInput.validity.valid) {
    authorError.textContent = "";
    authorInput.setCustomValidity("");
    authorError.className = "error";
  } else {
    showAuthorError();
  }
}

authorInput.addEventListener("input", () => {
  validateAuthor();
});

function showAuthorError() {
  if (authorInput.validity.valueMissing) {
    authorError.textContent = "Author name is required";
  } else if (authorInput.validity.tooShort) {
    authorError.textContent = `Author name must be at least ${authorInput.minLength} characters long. You entered ${authorInput.value.length} characters.`;
  }
  authorError.className = "error active";
}

// Pages Validation

function validatePages() {
  if (pagesInput.validity.valid) {
    pagesError.textContent = "";
    pagesInput.setCustomValidity("");
    pagesError.className = "error";
  } else {
    showPagesError();
  }
}

pagesInput.addEventListener("input", () => {
  validatePages();
});

function showPagesError() {
  if (pagesInput.validity.valueMissing) {
    pagesError.textContent = "Number of pages is required";
  } else if (pagesInput.validity.typeMismatch) {
    pagesError.textContent = "Number of pages must be a number";
  } else if (pagesInput.validity.rangeUnderflow) {
    pagesError.textContent = `Number of pages must be at least ${pagesInput.min}`;
  } else if (pagesInput.validity.rangeOverflow) {
    pagesError.textContent = `Number of pages must be less than ${pagesInput.max}`;
  }
  pagesError.className = "error active";
}

function allFieldsValid() {
  return (
    titleInput.validity.valid &&
    authorInput.validity.valid &&
    pagesInput.validity.valid
  );
}

// New Book Form Submission

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateTitle();
  validateAuthor();
  validatePages();
  if (!allFieldsValid()) {
    console.log("Prevent default!");
  } else {
    const title = newBookForm.elements["title-input"].value;
    const author = newBookForm.elements["author-input"].value;
    const pages = newBookForm.elements["pages-input"].value;
    const read = newBookForm.elements["read-input"].checked;
    const newBook = new Book(title, author, pages, read);
    myLibrary.addBookToLibrary(newBook);
    newBookForm.reset();
    newBookForm.classList.toggle("hidden");
    showFormButton.classList.toggle("hidden");
  }
});
