package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import swp391.learning.application.service.BookService;
import swp391.learning.application.specification.BookSpecifications;
import swp391.learning.domain.dto.common.PageResponse;
import swp391.learning.domain.dto.request.admin.book.BookRequest;
import swp391.learning.domain.dto.response.admin.BookCopy.BookCopyResponse;
import swp391.learning.domain.dto.response.admin.SampleBook.SampleBookResponse;
import swp391.learning.domain.dto.response.admin.author.AuthorResponse;
import swp391.learning.domain.dto.response.admin.book.SubCategoryBookResponse;
import swp391.learning.domain.dto.response.admin.book.BookResponse;
import swp391.learning.domain.dto.response.admin.category.CategoryResponse;
import swp391.learning.domain.dto.response.user.rent.LoanBookResponse;
import swp391.learning.domain.entity.*;
import swp391.learning.domain.enums.EnumBookStatus;
import swp391.learning.domain.dto.response.admin.Review.ReviewResponse;
import swp391.learning.domain.enums.EnumLoanStatus;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.exception.ResourceNotFoundException;
import swp391.learning.repository.*;

import java.io.IOException;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookCopyRepository bookCopyRepository;
    private final CategoryRepository categoryRepository;
    private final AuthorRepository authorRepository;
    private final UserRepository userRepository;
    private final FileService fileUploadService;
    private final ZipService zipService;
    private final LoanRepository loanRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public Book addBook(BookRequest addBookRequest) {
        log.info("Adding book with title: {} and userId: {}", addBookRequest.getTitle(), addBookRequest.getUserId());

        User user = userRepository.findById(addBookRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", addBookRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Book existedBook = bookRepository.findByISBN(addBookRequest.getIsbn());
        if (existedBook != null) {
            log.error("Add Book failed: Book is existed");
            throw new DuplicateResourceException("Sách đã tồn tại");
        }

        Book newBook = new Book();
        newBook.setISBN(addBookRequest.getIsbn());
        newBook.setTitle(addBookRequest.getTitle());
        newBook.setDesc(addBookRequest.getDescription());
        newBook.setPrice(addBookRequest.getPrice());
        newBook.setTotalPage(addBookRequest.getTotalPage());
        newBook.setLanguage(addBookRequest.getLanguage());
        newBook.setPublisher(addBookRequest.getPublisher());
        newBook.setPublicationYear(addBookRequest.getPublicationYear());
        newBook.setStatus(EnumBookStatus.valueOf(addBookRequest.getStatus()));
        newBook.setUserCreated(user);
        newBook.setUserUpdated(user);

        Set<Author> authors = getAuthors(addBookRequest.getAuthors());
        if (authors.isEmpty()) {
            log.info("Authors is empty");
            throw new ResourceNotFoundException("Tác giả không tồn tại");
        } else {
            newBook.setAuthors(authors);
        }

        Set<Category> categories = getCategories(addBookRequest.getCategories());
        if (categories.isEmpty()) {
            log.info("Categories is empty");
            throw new ResourceNotFoundException("Danh mục không tồn tại");
        } else {
            newBook.setCategories(categories);
        }

        return bookRepository.save(newBook);
    }

    @Override
    public Book updateBook(int id, BookRequest updateBookRequest) {
        log.info("Updating book with id: {} and userId: {}", id, updateBookRequest.getUserId());

        Book book = bookRepository.findById(id);
        if (book == null) {
            log.info("Book with id {} not found", id);
            throw new ResourceNotFoundException("Sách không tồn tại");
        }

        User user = userRepository.findById(updateBookRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", updateBookRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        book.setISBN(updateBookRequest.getIsbn());
        book.setTitle(updateBookRequest.getTitle());
        book.setDesc(updateBookRequest.getDescription());
        book.setPrice(updateBookRequest.getPrice());
        book.setTotalPage(updateBookRequest.getTotalPage());
        book.setLanguage(updateBookRequest.getLanguage());
        book.setPublisher(updateBookRequest.getPublisher());
        book.setPublicationYear(updateBookRequest.getPublicationYear());
        book.setStatus(EnumBookStatus.valueOf(updateBookRequest.getStatus()));
        book.setUserUpdated(user);

        Set<Author> authors = getAuthors(updateBookRequest.getAuthors());
        if (authors.isEmpty()) {
            log.info("Authors is empty");
            throw new ResourceNotFoundException("Tác giả không tồn tại");
        } else {
            book.setAuthors(authors);
        }

        Set<Category> categories = getCategories(updateBookRequest.getCategories());
        if (categories.isEmpty()) {
            log.info("Categories is empty");
            throw new ResourceNotFoundException("Danh mục không tồn tại");
        } else {
            book.setCategories(categories);
        }

        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(int id) {
        log.info("Deleting book with id: {}", id);
        Book book = bookRepository.findById(id);
        if (book == null) {
            log.info("Book with id {} not found", id);
            throw new ResourceNotFoundException("Sách không tồn tại");
        }
        bookRepository.delete(book);
    }

    private Set<Author> getAuthors(Set<Integer> authorIds) {
        Set<Author> authors = new HashSet<>();
        for (int authorId : authorIds) {
            Author author = authorRepository.findById(authorId);
            if (author == null) {
                log.info("Author with id {} not found", authorId);
                throw new ResourceNotFoundException("Tác giả không tồn tại");
            }
            authors.add(author);
        }
        return authors;
    }

    private Set<Category> getCategories(Set<Integer> categoryIds) {
        Set<Category> categories = new HashSet<>();
        for (int categoryId : categoryIds) {
            Category category = categoryRepository.findCategoryById(categoryId);
            if (category == null) {
                log.info("Category with id {} not found", categoryId);
                throw new ResourceNotFoundException("Danh mục không tôn tại");
            }
            categories.add(category);
        }
        return categories;
    }

    @Override
    public void uploadBookImage(int bookId, MultipartFile file) {
        Book book = bookRepository.findById(bookId);
        if (book == null) {
            log.info("Book with id {} not found", bookId);
            throw new ResourceNotFoundException("Sách không tồn tại");
        }

        if (book.getImagePath() != null && !book.getImagePath().isEmpty()) {
            fileUploadService.deleteImage("images", book.getImagePath());
        }

        String bookImagePath = fileUploadService.saveImage(file, "images");
        book.setImagePath(bookImagePath);

        bookRepository.save(book);

    }

    @Override
    public void uploadSampleBookImages(int bookId, Set<MultipartFile> files) {
        Book book = bookRepository.findById(bookId);
        if (book == null) {
            log.info("Book with id {} not found", bookId);
            throw new ResourceNotFoundException("Sách không tồn tại");
        }

        book.getSampleBooks().forEach(sampleBook -> {
            String sampleBookImage = sampleBook.getSampleBookImage();
            if (sampleBookImage != null && !sampleBookImage.isEmpty()) {
                fileUploadService.deleteImage("sample-books", sampleBookImage);
            }
        });
        book.getSampleBooks().clear();

        Set<SampleBook> sampleBooks = new HashSet<>();
        for (MultipartFile file : files) {
            String sampleBookImagePath = fileUploadService.saveImage(file, "sample-books");
            SampleBook sampleBook = new SampleBook(sampleBookImagePath, book);
            sampleBooks.add(sampleBook);
        }
        book.getSampleBooks().addAll(sampleBooks);
        bookRepository.save(book);
    }

    @Override
    public PageResponse<?> getBooks(int pageNo, int pageSize, String search, Integer categoryId,
                                    EnumBookStatus status) {
        log.info("Getting books with page: {}, size: {}, search: {}, categoryId: {}, status: {}", pageNo, pageSize,
                search, categoryId, status);
        int page = pageNo > 0 ? pageNo - 1 : 0;
        Pageable pageable = PageRequest.of(page, pageSize);

        Specification<Book> spec = Specification.where(null);

        if (status != null) {
            spec = spec.and(BookSpecifications.hasStatus(status));
        }

        if (categoryId != null) {
            spec = spec.and(BookSpecifications.hasCategoryId(categoryId));
        }

        if (search != null && !search.isEmpty()) {
            spec = spec.and(BookSpecifications.containsName(search));
        }


        Page<Book> bookPage = bookRepository.findAll(spec, pageable);
        log.info("Found {} pages", bookPage.getTotalPages());
        log.info("Found {} items on page {}", bookPage.getNumberOfElements(), pageNo);

        List<BookResponse> bookResponses = bookPage.getContent().stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());

        System.out.println("bookResponses: " + bookResponses);

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(bookPage.getTotalPages())
                .items(bookResponses)
                .build();
    }

    @Override
    public List<BookResponse> getNewestBooks() {
        log.info("Getting newest books");
        Pageable pageable = PageRequest.of(0, 10);
        List<Book> newestBooks = bookRepository.findNewestBooksByStatus(EnumBookStatus.ACTIVE, pageable);
        log.info("Found {} newest books", newestBooks.size());
        return newestBooks.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<SubCategoryBookResponse> getAllBooksBySubCategoryAndStatus(int parentCategoryId) {
        log.info("Getting all books by sub category and status");
        List<Category> subCategories;
        if (parentCategoryId == 0) {
            subCategories = categoryRepository.findAllSubCategories();
        } else {
            subCategories = categoryRepository.findAllByParentCategory(parentCategoryId);
        }

        List<SubCategoryBookResponse> subCategoryBookResponses = new ArrayList<>();

        for (Category subCategory : subCategories) {
            SubCategoryBookResponse subCategoryBookResponse = new SubCategoryBookResponse();
            subCategoryBookResponse.setSubCategoryName(subCategory.getName());

            List<BookResponse> books = subCategory.getBooks().stream()
                    .filter(book -> book.getStatus().equals(EnumBookStatus.ACTIVE))
                    .distinct()
                    .map(this::mapToBookResponse)
                    .limit(10)
                    .collect(Collectors.toList());

            subCategoryBookResponse.setBooks(books);
            subCategoryBookResponses.add(subCategoryBookResponse);
        }

        return subCategoryBookResponses;
    }

    @Override
    public List<BookResponse> getBooksBySubCategoryId(int categoryId) {
        log.info("Getting books by category id: {}", categoryId);
        List<Book> books = bookRepository.findAllByCategoryIdAndStatus(categoryId, EnumBookStatus.ACTIVE);
        log.info("Found {} books", books.size());
        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookResponse getBookById(int id, int userId) {
        Book book = bookRepository.findById(id);
        if (book == null) {
            log.info("Không tìm thấy sách với id {}", id);
            throw new ResourceNotFoundException("Không tìm thấy sách");
        }

        return mapToBookResponse(book, userId);
    }

    @Override
    public Resource getBookImage(int id) {
        Book book = bookRepository.findById(id);
        if (book == null) {
            log.info("Không tìm thấy sách với id {}", id);
            throw new ResourceNotFoundException("Không tìm thấy sách");
        }

        String imagePath = book.getImagePath();

        try {
            log.info("Tải ảnh sách: {}", imagePath);
            return fileUploadService.getImage("images", imagePath);
        } catch (Exception e) {
            log.error("Lỗi khi tải ảnh sách: {}", e.getMessage());
            throw new ResourceNotFoundException("Không tìm thấy ảnh sách");
        }
    }

    @Override
    public Resource getSampleBookImages(int id) {
        Book book = bookRepository.findById(id);
        if (book == null) {
            log.info("Không tìm thấy sách với id {}", id);
            throw new ResourceNotFoundException("Không tìm thấy sách");
        }

        List<Resource> sampleBookImages = book.getSampleBooks().stream()
                .map(sampleBook -> {
                    try {
                        if (StringUtils.hasText(sampleBook.getSampleBookImage())) {
                            return fileUploadService.getImage("sample-books", sampleBook.getSampleBookImage());
                        } else {
                            return null;
                        }
                    } catch (Exception e) {
                        log.error("Lỗi khi tải ảnh mẫu sách: {}", e.getMessage());
                        throw new ResourceNotFoundException("Không tìm thấy ảnh mẫu sách");
                    }
                })
                .filter(resource -> resource != null)
                .collect(Collectors.toList());

        try {
            byte[] zipBytes = zipService.createZip(sampleBookImages);
            return new ByteArrayResource(zipBytes);
        } catch (IOException e) {
            log.error("Lỗi khi tạo file zip: {}", e.getMessage());
            throw new ResourceNotFoundException("Lỗi khi tạo file zip");
        }
    }

    public BookResponse mapToBookResponse(Book book) {
        return mapToBookResponse(book, 0); // Call the overloaded method with null userId
    }

    public BookResponse mapToBookResponse(Book book, int userId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = book.getUpdatedAt().format(formatter);

        BookResponse response = new BookResponse();
        response.setId(book.getId());
        response.setUserId(book.getUserUpdated().getId());
        response.setIsbn(book.getISBN());
        response.setTitle(book.getTitle());
        response.setUpdatedAt(formattedDateTime);
        response.setUpdatedBy(book.getUserUpdated().getFullName());
        response.setTotalReviews(countReviewsByBookId(book.getId()));
        response.setPrice(book.getPrice());
        response.setTotalPage(book.getTotalPage());
        response.setLanguage(book.getLanguage());
        response.setPublisher(book.getPublisher());
        response.setDescription(book.getDesc());
        response.setPublicationYear(book.getPublicationYear());
        response.setStock(countByStatusAndBookId(EnumBookStatus.AVAILABLE, book.getId()));
        response.setStatus(book.getStatus().toString());
        response.setImagePath(book.getImagePath());

        List<Review> reviews = reviewRepository.findByBookId(book.getId());
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(review -> {
                    ReviewResponse reviewResponse = new ReviewResponse();
                    reviewResponse.setId(review.getId());
                    reviewResponse.setMemberId(review.getUser().getId());
                    reviewResponse.setMemberName(review.getUser().getFullName());
                    reviewResponse.setRating(review.getRating());
                    reviewResponse.setFeedback(review.getFeedback());
                    reviewResponse.setUpdatedAt(review.getUpdatedAt().format(formatter));
                    return reviewResponse;
                })
                .collect(Collectors.toList());
        response.setReviews(reviewResponses);

        Set<CategoryResponse> categoryResponses = book.getCategories().stream()
                .map(category -> {
                    CategoryResponse categoryResponse = new CategoryResponse();
                    categoryResponse.setId(category.getId());
                    categoryResponse.setName(category.getName());
                    categoryResponse.setParentId(category.getParentCategory().getId());
                    categoryResponse.setParentName(category.getParentCategory().getName());
                    return categoryResponse;
                })
                .collect(Collectors.toSet());
        response.setCategories(categoryResponses);

        Set<AuthorResponse> authorResponses = book.getAuthors().stream()
                .map(author -> {
                    AuthorResponse authorResponse = new AuthorResponse();
                    authorResponse.setId(author.getId());
                    authorResponse.setName(author.getName());
                    authorResponse.setDescription(author.getDesc());
                    return authorResponse;
                })
                .collect(Collectors.toSet());
        response.setAuthors(authorResponses);

        if (userId > 0) {
            Set<BookCopyResponse> bookCopyResponses = bookCopyRepository.findByBookIdAndUserId(book.getId(), userId)
                    .stream()
                    .map(this::mapToBookCopyResponse)
                    .collect(Collectors.toSet());
            response.setBookCopies(bookCopyResponses);
        }
        // }else{
        //     Set<BookCopyResponse> bookCopyResponses = bookCopyRepository.findByBookId(book.getId()).stream()
        //         .map(this::mapToBookCopyResponse)
        //         .collect(Collectors.toSet());
        // response.setBookCopies(bookCopyResponses);
        // }
        Double averageRating = reviewRepository.findAverageRatingByBookId(book.getId());
        if (averageRating != null) {
            DecimalFormat df = new DecimalFormat("#.#");
            double roundedRating = Double.parseDouble(df.format(averageRating));
            response.setRating(roundedRating);
        } else {
            response.setRating(0.0);
        }
        Set<SampleBookResponse> sampleBookResponses = book.getSampleBooks().stream()
                .map(sampleBook -> {
                    SampleBookResponse sampleBookResponse = new SampleBookResponse();
                    sampleBookResponse.setId(sampleBook.getId());
                    sampleBookResponse.setSampleBookImage(sampleBook.getSampleBookImage());
                    return sampleBookResponse;
                })
                .collect(Collectors.toSet());
        response.setSampleBooks(sampleBookResponses);

        return response;
    }

    private BookCopyResponse mapToBookCopyResponse(BookCopy bookCopy) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = bookCopy.getUpdatedAt().format(formatter);

        List<Loan> loans = loanRepository.getLoansByBookCopyId(bookCopy.getId());

        BookCopyResponse bookCopyResponse = new BookCopyResponse();
        bookCopyResponse.setId(bookCopy.getId());
        bookCopyResponse.setUserId(bookCopy.getCreatedBy().getId());
        bookCopyResponse.setBarcode(bookCopy.getBarcode());
        bookCopyResponse.setStatus(bookCopy.getStatus().toString());
        bookCopyResponse.setUpdatedBy(bookCopy.getUpdatedBy().getFullName());
        bookCopyResponse.setUpdatedAt(formattedDateTime);
        bookCopyResponse.setLoanInfo(mapLoanToLoanInfos(loans));

        return bookCopyResponse;
    }

    public List<BookCopyResponse.LoanInfo> mapLoanToLoanInfos(List<Loan> loans) {
        List<BookCopyResponse.LoanInfo> list = new ArrayList<>();
        for (Loan l : loans) {
            list.add(new BookCopyResponse.LoanInfo(l.getId(), l.getNote()));
        }
        return list;
    }

    private int countByStatusAndBookId(EnumBookStatus status, int bookId) {
        return bookCopyRepository.countByStatusAndBookId(status, bookId);
    }
    private int countReviewsByBookId(int bookId) {
        return reviewRepository.countReviewsByBookId(bookId);
    }
}
