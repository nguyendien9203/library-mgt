package swp391.learning.application.service.Implements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.BookCopyService;
import swp391.learning.application.service.LoanService;
import swp391.learning.application.service.MemberSubscriptionService;
import swp391.learning.domain.dto.response.admin.loan.DailyHourlyLoanDataResponse;
import swp391.learning.domain.dto.response.admin.loan.LoanStatisticResponse;
import swp391.learning.domain.dto.response.user.rent.LoanBookResponse;
import swp391.learning.domain.dto.response.user.rent.RentResponse;
import swp391.learning.domain.entity.BookCopy;
import swp391.learning.domain.entity.Loan;
import swp391.learning.domain.enums.EnumBookStatus;
import swp391.learning.domain.enums.EnumLoanStatus;
import swp391.learning.repository.BookCopyRepository;
import swp391.learning.repository.LoanRepository;
import swp391.learning.repository.ReviewRepository;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private BookCopyService bookCopyService;
    @Autowired
    private BookCopyRepository bookCopyRepository;
    @Autowired
    private MemberSubscriptionService memberSubscriptionService;
    @Autowired
    private ReviewRepository reviewRepository;


    @Override
    public void addLoan(Loan loan) {
        loanRepository.save(loan);
    }

    private RentResponse mapLoanToRentResponse(Loan loan) {
        RentResponse rentResponse = RentResponse.builder()
                .loanId(loan.getId())
                .userName(loan.getUser().getUsername())
                .maxBook(memberSubscriptionService.findById(loan.getUser().getMemberSubscription().getId()).getMaxBook())
                .bookCopyResponse(bookCopyService.mapBookCopyToBookCopyResponse(loan.getBookCopy()))
                .memberId(loan.getUser().getMemberSubscription().getId())
                .memFee(memberSubscriptionService.findById(loan.getUser().getMemberSubscription().getId())
                        .getFeeMember())
                .borrowAt(loan.getBorrowAt())
                .returnAt(loan.getReturnAt())
                .dueDate(loan.getDueDate())
                .note(loan.getNote())
                .status(loan.getStatus().name())
                .userId(loan.getUser().getId())
                .price(loan.getPrice())
                .build();
        return rentResponse;
    }

    @Override
    public List<RentResponse> getLoansByUserIdAndActive(int userId) {
        List<RentResponse> list = new ArrayList<>();
        List<String> statusList = Arrays.asList(EnumLoanStatus.ACTIVE.name(), EnumLoanStatus.PENDING.name());
        List<Loan> listLoan = loanRepository.findByUserIdAndStatusIn(userId, statusList);
        
        for (Loan loan : listLoan) {
            list.add(mapLoanToRentResponse(loan));
        }

        return list;
    }

    @Override
    public List<RentResponse> getLoansWithPendingState() {
        List<RentResponse> list = new ArrayList<>();

        List<Loan> listLoan = loanRepository.getLoansByStatus(EnumLoanStatus.PENDING);
        for (Loan loan : listLoan) {
            list.add(mapLoanToRentResponse(loan));
        }

        return list;
    }

    @Override
    public List<RentResponse> getLoansWithReturnState() {
        List<RentResponse> list = new ArrayList<>();

        List<Loan> listLoan = loanRepository.getLoansByStatus(EnumLoanStatus.RETURNED);
        for (Loan loan : listLoan) {
            list.add(mapLoanToRentResponse(loan));
        }

        return list;
    }

    @Override
    public Loan approveLoan(int loanId, int bookCopyId) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId);
        bookCopy.setStatus(EnumBookStatus.ACTIVE);
        bookCopyRepository.save(bookCopy);

        Loan loan = loanRepository.findById(loanId).orElse(null);
        loan.setStatus(EnumLoanStatus.ACTIVE);
        return loanRepository.save(loan);
    }

    @Override
    public List<RentResponse> getLoansWithRejectState() {
        List<RentResponse> list = new ArrayList<>();

        List<Loan> listLoan = loanRepository.getLoansByStatus(EnumLoanStatus.REJECT);
        for (Loan loan : listLoan) {
            list.add(mapLoanToRentResponse(loan));
        }

        return list;
    }

    @Override
    public Loan rejectLoan(int loanId, int bookCopyId, String note) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId);
        bookCopy.setStatus(EnumBookStatus.REJECT);
        bookCopyRepository.save(bookCopy);

        Loan loan = loanRepository.findById(loanId).orElse(null);
        loan.setStatus(EnumLoanStatus.REJECT);
        loan.setNote(note);
        return loanRepository.save(loan);
    }

    @Override
    public Loan returningLoan(int loanId, int bookCopyId) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId);
        bookCopy.setStatus(EnumBookStatus.RETURNING);
        bookCopyRepository.save(bookCopy);

        Loan loan = loanRepository.findById(loanId).orElse(null);
        loan.setStatus(EnumLoanStatus.RETURNING);
        return loanRepository.save(loan);
    }

    @Override
    public Loan returnLoan(int loanId, int bookCopyId) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId);
        bookCopy.setStatus(EnumBookStatus.RETURNED);
        bookCopyRepository.save(bookCopy);

        Loan loan = loanRepository.findById(loanId).orElse(null);
        loan.setStatus(EnumLoanStatus.RETURNED);
        return loanRepository.save(loan);
    }

    @Override
    public List<RentResponse> getLoansWithReturningState() {
        List<RentResponse> list = new ArrayList<>();

        List<Loan> listLoan = loanRepository.getLoansByStatus(EnumLoanStatus.RETURNING);
        for (Loan loan : listLoan) {
            list.add(mapLoanToRentResponse(loan));
        }

        return list;
    }

    @Override
    public List<LoanBookResponse> getLoanBookByUserIdAndStatus(int userId, EnumLoanStatus status) {
        List<Loan> loans;
        if(status == null) {
            loans = loanRepository.getLoansByUserId(userId);
        } else {
            loans = loanRepository.findByUserIdAndStatusIn(userId, List.of(status.name()));
        }

        List<LoanBookResponse> loanBookResponses = new ArrayList<>();
        for (Loan loan : loans) {
            loanBookResponses.add(mapToLoanBookResponse(loan));
        }

        return loanBookResponses;
    }

    @Override
    public LoanStatisticResponse getLoanStatistic() {
        return LoanStatisticResponse.builder()
                .booksPending(countBooksPending(EnumLoanStatus.PENDING))
                .booksReturning(countBooksReturning(EnumLoanStatus.RETURNING))
                .booksBorrowedToday(countBooksBorrowedToday(EnumLoanStatus.ACTIVE))
                .booksReturnedToday(countBooksReturnedToday(EnumLoanStatus.RETURNED))
                .booksRejectedToday(countBooksRejectedToday(EnumLoanStatus.REJECT))
                .build();
    }

    @Override
    public DailyHourlyLoanDataResponse getHourlyLoanData(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        EnumLoanStatus activeStatus = EnumLoanStatus.ACTIVE;

        List<Object[]> borrowedResults = loanRepository.countBorrowedBooksByHour(startOfDay, endOfDay, activeStatus);
        List<Object[]> returnedResults = loanRepository.countReturnedBooksByHour(startOfDay, endOfDay, activeStatus);

        Map<Integer, Long> borrowedData = new HashMap<>();
        Map<Integer, Long> returnedData = new HashMap<>();

        for (Object[] result : borrowedResults) {
            Integer hour = (Integer) result[0];
            Long count = (Long) result[1];
            borrowedData.put(hour, count);
        }

        for (Object[] result : returnedResults) {
            Integer hour = (Integer) result[0];
            Long count = (Long) result[1];
            returnedData.put(hour, count);
        }

        for (int i = 0; i < 24; i++) {
            borrowedData.putIfAbsent(i, 0L);
            returnedData.putIfAbsent(i, 0L);
        }

        return new DailyHourlyLoanDataResponse(borrowedData, returnedData);
    }

    private int countBooksPending(EnumLoanStatus status) {
        return loanRepository.countBooksPending(status);
    }

    private int countBooksReturning(EnumLoanStatus status) {
        return loanRepository.countBooksReturning(status);
    }

    private int countBooksBorrowedToday(EnumLoanStatus status) {
        return loanRepository.countBooksBorrowedToday(status);
    }

    private int countBooksReturnedToday(EnumLoanStatus status) {
        return loanRepository.countBooksReturnedToday(status);
    }

    private int countBooksRejectedToday(EnumLoanStatus status) {
        return loanRepository.countBooksRejectedToday(status);
    }


    private LoanBookResponse mapToLoanBookResponse(Loan loan) {
        LoanBookResponse loanBookResponse = new LoanBookResponse();
        loanBookResponse.setLoanId(loan.getId());
        loanBookResponse.setUserId(loan.getUser().getId());
        loanBookResponse.setBorrowAt(formatDateTime(loan.getBorrowAt()));
        loanBookResponse.setReturnAt(formatDateTime(loan.getReturnAt()));
        loanBookResponse.setDueDate(formatDateTime(loan.getDueDate()));
        loanBookResponse.setNote(loan.getNote());
        loanBookResponse.setStatus(loan.getStatus().name());

        LoanBookResponse.BookCopyResponse bookCopyResponse = new LoanBookResponse.BookCopyResponse();
        bookCopyResponse.setId(loan.getBookCopy().getId());
        bookCopyResponse.setBarcode(loan.getBookCopy().getBarcode());

        LoanBookResponse.BookCopyResponse.BookResponse bookResponse = new LoanBookResponse.BookCopyResponse.BookResponse();
        bookResponse.setId(loan.getBookCopy().getBook().getId());
        bookResponse.setTitle(loan.getBookCopy().getBook().getTitle());
        bookResponse.setRating(averageRating(loan.getBookCopy().getBook().getId()));
        bookResponse.setPublicationYear(loan.getBookCopy().getBook().getPublicationYear());
        bookResponse.setImagePath(loan.getBookCopy().getBook().getImagePath());

        Set<LoanBookResponse.AuthorResponse> authorResponses = loan.getBookCopy().getBook().getAuthors().stream()
                .map(author -> {
                    LoanBookResponse.AuthorResponse authorResponse = new LoanBookResponse.AuthorResponse();
                    authorResponse.setId(author.getId());
                    authorResponse.setName(author.getName());
                    return authorResponse;
                })
                .collect(Collectors.toSet());

        bookResponse.setAuthors(authorResponses);
        bookCopyResponse.setBookResponse(bookResponse);
        loanBookResponse.setBookCopyResponse(bookCopyResponse);

        return loanBookResponse;
    }

    private String formatDateTime(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return dateTime.format(formatter);
    }

    private double averageRating(int bookId) {
        Double averageRating = reviewRepository.findAverageRatingByBookId(bookId);
        if (averageRating != null) {
            DecimalFormat df = new DecimalFormat("#.#");
            return Double.parseDouble(df.format(averageRating));
        } else {
            return 0.0;
        }
    }
}
