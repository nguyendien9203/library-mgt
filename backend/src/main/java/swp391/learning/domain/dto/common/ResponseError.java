package swp391.learning.domain.dto.common;

public class ResponseError extends ResponseSuccess {
    public ResponseError(int status, String message) {
        super(status, message);
    }
}