//Create two constructors

function Book (title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



//Create UI Constructors

function UI() {

}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  //Create a table row element

  const row = document.createElement('tr');

  //Insert table columns

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row);
}

UI.prototype.clearFields = function( ){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Create Event Listeners

document.getElementById('book-form').addEventListener('submit', function(e) {
  console.log(e);

  //On submit, get all the inputs

  const title = document.getElementById('title').value, 
  author = document.getElementById('author').value, 
  isbn = document.getElementById('isbn').value;
  console.log(title, author, isbn);

  //Instantiate a new book object
  const book = new Book(title, author, isbn);
  console.log(book);

  //Instantiate a new UI object

  const ui = new UI();
  console.log(ui);

  //Add book to list

  ui.addBookToList(book);

  //Clear fields 

  ui.clearFields();

  e.preventDefault();
})