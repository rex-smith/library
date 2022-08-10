// Select DOM elements from HTML

const libraryContainer = document.querySelector("#library-container");
const newBookForm = document.querySelector("#new-book-form");
const showFormButton = document.querySelector('#show-form-button');

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
    let newBookCard = document.createElement('div');
    newBookCard.classList.add('book-card');
    newBookCard.id = String(book.title);
    let newBookCardTitle = document.createElement('h2');
  
    // Adding in book card's information
    newBookCardTitle.innerHTML = book.title;
    newBookCard.appendChild(newBookCardTitle);
  
    let newBookCardAuthor = document.createElement('h3');
    newBookCardAuthor.innerHTML = `by ${book.author}`;
    newBookCard.appendChild(newBookCardAuthor);
  
    let newBookCardPages = document.createElement('p');
    newBookCardPages.innerHTML = `${book.pages} pages`;
    newBookCard.appendChild(newBookCardPages);
  
    let newBookCardRead = document.createElement('p');
    newBookCardRead.innerHTML = (book.read ? 'Read' : 'Not read yet');
    newBookCard.appendChild(newBookCardRead);
  
    let newBookCardReadButton = document.createElement('button');
    newBookCardReadButton.classList.add('button', 'button-read');
    newBookCardReadButton.innerHTML = (book.read ? 'Mark as unread' : 'Mark as read');
    newBookCardReadButton.addEventListener('click', () => {
      book.toggleRead();
      newBookCardRead.innerHTML = (book.read ? 'Read' : 'Not read yet');
      newBookCardReadButton.innerHTML = (book.read ? 'Mark as unread' : 'Mark as read');
    });
  
    newBookCard.appendChild(newBookCardReadButton);
    
    // Delete Book Button
    let deleteBookButton = document.createElement('button');
    deleteBookButton.innerHTML = 'Remove Book';
    deleteBookButton.classList.add('button', 'button-delete');
    deleteBookButton.addEventListener('click', () => {
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
  }

}

// Setup of initial library
let myLibrary = new Library();

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.addBookToLibrary(theHobbit);

let annaKarenina = new Book('Anna Karenina', 'Leo Tolstoy', 600, true);
myLibrary.addBookToLibrary(annaKarenina);

let warAndPeace = new Book('War and Peace', 'Leo Tolstoy', 1200, false);
myLibrary.addBookToLibrary(warAndPeace);

let theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
myLibrary.addBookToLibrary(theGreatGatsby);

let ulysses = new Book('Ulysses', 'James Joyce', 730, false);
myLibrary.addBookToLibrary(ulysses);

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
  myLibrary.addBookToLibrary(newBook);
  newBookForm.reset();
  newBookForm.classList.toggle('hidden');
  showFormButton.classList.toggle('hidden');
});

