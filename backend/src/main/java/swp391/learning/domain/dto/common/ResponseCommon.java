package swp391.learning.domain.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import swp391.learning.domain.enums.ResponseCode;

@Getter
@Setter
@ToString
public class ResponseCommon<T> {
    private int code;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public ResponseCommon() {
    }

    public ResponseCommon(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResponseCommon(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ResponseCommon(T data) {
        this.code = 0;
        this.message = "success";
        this.data = data;
    }

    public ResponseCommon(ResponseCode responseCode, T data) {
        this.code = responseCode.getCode();
        this.message = responseCode.getMessage();
        this.data = data;
    }


}