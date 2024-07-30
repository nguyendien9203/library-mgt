import React from 'react';
import BookCard from './BookCard';
import '../../assets/style/BookAll.css';

const BookAll = ({ title, books }) => {
  return (
    <>
      <h6 className="mb-3">{title}</h6>
      <div className="book-list mb-3">
        {books.map(book => (
          <div key={book.id} className="book-item">
            <BookCard
              bookId={book.id}
              imageUrl={book.imageUrl}
              mode="info"
              title={book.title}
              authors={book.authors}
              publicationYear={book.publicationYear}
              rating={book.rating}
              cardWidth="8rem"
              cardPadding="12px"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BookAll;
