package swp391.learning.domain.dto.request.admin.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class BookRequest {
    @NotNull
    private int userId;

    @NotBlank
    private String isbn;

    @NotBlank
    private String title;

    @NotNull
    private BigDecimal price;

    @NotNull
    private int totalPage;

    @NotBlank
    private String language;


    private String publisher;


    private int publicationYear;

    private String description;
    private String status;

    @NotEmpty
    private Set<Integer> authors;

    private Set<Integer> categories;
}
