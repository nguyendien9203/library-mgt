package swp391.learning.domain.enums;

import lombok.Getter;

@Getter
public enum ResponseCode { // thang cong: 200, that bai: 400, khong tim thay: 404, Khong ton tai:401
    SUCCESS(200, "Thành công"),
    FAIL(400, "Thất bại"),
    USER_NOT_FOUND(404, "Không tìm thấy người dùng"),
    PASSWORD_INCORRECT(400, "Mật khẩu không đúng"),
    OTP_INCORRECT(400, "OTP không đúng"),
    EXPIRED_OTP(400, "OTP đã hết hạn"),
    USER_EXIST(400, "Người dùng đã tồn tại"),
    OLD_PASSWORD_INCORRECT(400, "Mật khẩu cũ không đúng"),
    // danh mục
    CATEGORY_EXIST(400, "Danh mục đã tồn tại"),
    CATEGORY_NOT_EXIST(401, "Danh mục không tồn tại"),
    CATEGORY_LIST_IS_EMPTY(400, "Danh sách danh mục trống"),
    // tác giả
    AUTHOR_EXIST(400, "Tác giả đã tồn tại"),
    AUTHOR_NOT_EXIST(401, "Tác giả không tồn tại"),
    AUTHOR_LIST_IS_EMPTY(400, "Danh sách tác giả trống"),
    // sách
    BOOK_EXIST(400, "Sách đã tồn tại"),
    BOOK_NOT_EXIST(401, "Sách không tồn tại"),
    BOOK_LIST_IS_EMPTY(400, "Danh sách sách trống"),
    // thanh toán
    ORDER_NOT_EXIST(3800, "Đơn hàng không tồn tại"),
    PAYMENT_FAIL(3900, "Thanh toán thất bại VNPAY"),
    SEND_URL_PAYMENT_FAIL(4000, "Gửi URL thanh toán thất bại"),
    CHANGE_PARAM(4100, "Thay đổi URL"),
    ORDER_NOT_FOUND(4200, "Không tìm thấy đơn hàng"),
    INVALID_AMOUNT(4300, "Số tiền không hợp lệ"),
    ORDER_ALREADY_CONFIRM(4400, "Đơn hàng đã được xác nhận"),
    USER_CANCEL_BILL(4500, "Người dùng đã hủy hóa đơn"),
    // thành viên
    SUBSCRIPTION_EXIST(400, "Gói thành viên đã tồn tại"),
    SUBSCRIPTION_NOT_EXIST_LIST_IS_EMPTY(400, "Danh sách gói thành viên trống"),
    SUBSCRIPTION_NOT_EXIST(404, "Gói thành viên không tồn tại"),

    ;
    private final int code;
    private final String message;

    ResponseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}

