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

//Show alert

UI.prototype.showAlert = function(message, cls) {

  //Create element
  const div = document.createElement('div');

  //Add Classes
  div.className = `alert ${cls}`;


  div.appendChild(document.createTextNode(message));

  //get the parent

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  //Disappear after 3 seconds 

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
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

  //Validate

  if(title === '' || author === '' || isbn === '') {
    //Error alert

    ui.showAlert('Please fill in all fields', 'error');
    
  } else {
      //Add book to list

      ui.addBookToList(book);

      //Show Success

      ui.showAlert('Book successfully add!', 'success');

      //Clear fields 

      ui.clearFields();
  }

 

  e.preventDefault();
});

