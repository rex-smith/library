let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  addBookToLibrary(this);

  this.info = function() {
    if (this.read === true) {
      return `${this.title} by ${this.author}, ${this.pages} pages, read`;
    } else {
      return  `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
  }

  function toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const annaKarenina = new Book('Anna Karenina', 'Leo Tolstoy', 600, true);
const warAndPeace = new Book('War and Peace', 'Leo Tolstoy', 1200, false);

const libraryContainer = document.querySelector('.library-container');

for (let i = 0; i < myLibrary.length; i++) {
  const newBookCard = document.createElement('div');
  newBookCard.classList.add('book-card');
  const newBookCardTitle = document.createElement('h2');
  newBookCardTitle.innerHTML = myLibrary[i].title;
  newBookCard.appendChild(newBookCardTitle);

  const newBookCardAuthor = document.createElement('h3');
  newBookCardAuthor.innerHTML = myLibrary[i].author;
  newBookCard.appendChild(newBookCardAuthor);

  const newBookCardPages = document.createElement('p');
  newBookCardPages.innerHTML = `${myLibrary[i].pages} pages`;
  newBookCard.appendChild(newBookCardPages);

  const newBookCardRead = document.createElement('p');
  newBookCardRead.innerHTML = (myLibrary[i].read ? 'Read' : 'Not read yet');
  newBookCard.appendChild(newBookCardRead);
  
  libraryContainer.appendChild(newBookCard);
}