package swp391.learning.application.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import swp391.learning.domain.dto.common.PageResponse;
import swp391.learning.domain.dto.request.admin.book.BookRequest;
import swp391.learning.domain.dto.response.admin.book.BookResponse;
import swp391.learning.domain.dto.response.admin.book.SubCategoryBookResponse;
import swp391.learning.domain.dto.response.user.rent.LoanBookResponse;
import swp391.learning.domain.entity.Book;
import swp391.learning.domain.enums.EnumBookStatus;
import swp391.learning.domain.enums.EnumLoanStatus;

import java.util.List;
import java.util.Set;

public interface BookService {

    Book addBook(BookRequest addBookRequest);

    Book updateBook(int id, BookRequest updateBookRequest);

    void deleteBook(int id);

    void uploadBookImage(int id, MultipartFile file);

    void uploadSampleBookImages(int id, Set<MultipartFile> files);

    PageResponse<?> getBooks(int pageNo, int pageSize, String search, Integer categoryId, EnumBookStatus status);
    List<BookResponse> getNewestBooks();

    List<SubCategoryBookResponse> getAllBooksBySubCategoryAndStatus(int parentCategoryId);

    List<BookResponse> getBooksBySubCategoryId(int categoryId);

    BookResponse getBookById(int id, int userId);
    Resource getBookImage(int id);

    Resource getSampleBookImages(int id);



}
