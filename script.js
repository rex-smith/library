// Select DOM elements from HTML

const libraryContainer = document.querySelector("#library-container");
const newBookForm = document.querySelector("#new-book-form");
const showFormButton = document.querySelector('#show-form-button');

let myLibrary = [];

// Book Constructor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  addBookToLibrary(this);
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  newBookCard(book);
}

// Setup of initial library

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const annaKarenina = new Book('Anna Karenina', 'Leo Tolstoy', 600, true);
const warAndPeace = new Book('War and Peace', 'Leo Tolstoy', 1200, false);
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
const ulysses = new Book('Ulysses', 'James Joyce', 730, false);

// Book Card Creation

function newBookCard(book) {
  const newBookCard = document.createElement('div');
  newBookCard.classList.add('book-card');
  const newBookCardTitle = document.createElement('h2');

  // Adding in book card's information
  newBookCardTitle.innerHTML = book.title;
  newBookCard.appendChild(newBookCardTitle);

  const newBookCardAuthor = document.createElement('h3');
  newBookCardAuthor.innerHTML = `by ${book.author}`;
  newBookCard.appendChild(newBookCardAuthor);

  const newBookCardPages = document.createElement('p');
  newBookCardPages.innerHTML = `${book.pages} pages`;
  newBookCard.appendChild(newBookCardPages);

  const newBookCardRead = document.createElement('p');
  newBookCardRead.innerHTML = (book.read ? 'Read' : 'Not read yet');
  newBookCard.appendChild(newBookCardRead);

  const newBookCardReadButton = document.createElement('button');
  newBookCardReadButton.classList.add('button', 'button-read');
  newBookCardReadButton.innerHTML = (book.read ? 'Mark as unread' : 'Mark as read');
  newBookCardReadButton.addEventListener('click', () => {
    book.toggleRead();
    newBookCardRead.innerHTML = (book.read ? 'Read' : 'Not read yet');
    newBookCardReadButton.innerHTML = (book.read ? 'Mark as unread' : 'Mark as read');
  });

  newBookCard.appendChild(newBookCardReadButton);
  
  // Delete Book Button
  const deleteBookButton = document.createElement('button');
  deleteBookButton.innerHTML = 'Remove Book';
  deleteBookButton.classList.add('button', 'button-delete');
  deleteBookButton.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    libraryContainer.removeChild(newBookCard);
    console.log(myLibrary);
  });
  newBookCard.appendChild(deleteBookButton);

  // Append book card to library container
  libraryContainer.appendChild(newBookCard);
}

// Toggle to Show New Book Form 

showFormButton.addEventListener('click', () => {
  newBookForm.classList.toggle('hidden');
  showFormButton.classList.toggle('hidden');
});

// New Book Form Submission

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = newBookForm.elements['title-input'].value;
  const author = newBookForm.elements['author-input'].value;
  const pages = newBookForm.elements['pages-input'].value;
  const read = newBookForm.elements['read-input'].checked;
  const newBook = new Book(title, author, pages, read);
  newBookForm.reset();
  newBookForm.classList.toggle('hidden');
  showFormButton.classList.toggle('hidden');
});

