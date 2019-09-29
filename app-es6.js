class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}

class UI {
  addBookToList(book) {
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

  showAlert(msg, className) {
    //Create element
  const div = document.createElement('div');

  //Add Classes
  div.className = `alert ${className}`;


  div.appendChild(document.createTextNode(msg));

  //get the parent

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  //Disappear after 3 seconds 

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}


//Local Storage Class

class Store {

  static getBooks() {
    let books; 

    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static removeBook(isbn) {
    const books = Store.getBooks();

      books.forEach(function(book) {
        if(book.isbn === isbn) {
          books.splice(books.indexOf(book), 1);
         
        }
      });

    localStorage.setItem('books', JSON.stringify(books));
  }


}


//DOM Load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);







//Event listener for adding a book

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

      //Add to local storage

      Store.addBook(book);

      //Show Success

      ui.showAlert('Book successfully add!', 'success');

      //Clear fields 

      ui.clearFields();
  }

 

  e.preventDefault();
});

//Event Listener for delete

document.getElementById('book-list').addEventListener('click', function(e) {
  
   //Instantiate a new UI object

   const ui = new UI();

    //Remove the book
  ui.deleteBook(e.target);

  //Remove book from local store
  console.log(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show an alert

  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});