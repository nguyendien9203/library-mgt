package swp391.learning.domain.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;

public class ResponseSuccess<T> {
    private final int status;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public ResponseSuccess(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ResponseSuccess(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }
}
