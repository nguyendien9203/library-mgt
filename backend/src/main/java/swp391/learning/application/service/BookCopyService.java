package swp391.learning.application.service;

import swp391.learning.domain.dto.request.admin.book.BookCopyRequest;
import swp391.learning.domain.dto.response.admin.BookCopy.BookCopyResponse;
import swp391.learning.domain.entity.BookCopy;

public interface BookCopyService {

    void addBookCopy(BookCopyRequest bookCopyRequest);
    BookCopy saveBookCopy(BookCopyRequest bookCopyRequest);

    void updateBookCopy(int id, BookCopyRequest bookCopyRequest);

    void deleteBookCopy(int id);

    BookCopy getBookCopyById(int id);
    BookCopyResponse mapBookCopyToBookCopyResponse(BookCopy bookCopy);


}
