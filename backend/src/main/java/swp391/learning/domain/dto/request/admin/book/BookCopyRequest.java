package swp391.learning.domain.dto.request.admin.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookCopyRequest {
    @NotNull
    private int bookId;

    @NotNull
    private int userId;

    @NotBlank
    private String barcode;

    @NotBlank
    private String status;
}
