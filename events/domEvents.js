/* eslint-disable import/no-duplicates */
import { deleteBook } from '../api/bookData';
import { getBooks } from '../api/bookData';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import { getSingleBook } from '../api/bookData';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getAuthorBooks, getSingleAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { getAuthors } from '../api/authorData';
import { getBookDetails, deleteAuthorBooksRelationship } from '../api/mergedData';
import viewBook from '../pages/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }

    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR - FIXED
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE AUTHOR', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // TODO: CREATE CLICK EVENT TO CAPTURE THE CLICK ON THE 'VIEW-AUTHOR-BTN' THAT IS IN THE AUTHOR CARD
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getAuthorBooks(firebaseKey).then(showBooks);
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR - FIXED
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR - FIXED
    if (e.target.id.includes('update-author-button')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleAuthor(firebaseKey).then((bookObj) => addAuthorForm(bookObj));
    }
  });
};

export default domEvents;
