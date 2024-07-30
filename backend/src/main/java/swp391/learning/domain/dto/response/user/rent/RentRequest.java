package swp391.learning.domain.dto.response.user.rent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RentRequest {
    private int id;
    private String borrowAt;
    private String returnAt;
    private String barcode;
    private String description;
    private double price;
}
