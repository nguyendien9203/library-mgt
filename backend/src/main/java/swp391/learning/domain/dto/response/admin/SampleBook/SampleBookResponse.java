package swp391.learning.domain.dto.response.admin.SampleBook;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class SampleBookResponse {
    private int id;
    private String sampleBookImage;
}
