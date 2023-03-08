package com.vti.vtiacademybackend.exception;

import org.springframework.http.HttpStatus;

public enum ErrorResponseBase {
    NOT_FOUND(HttpStatus.NOT_FOUND, "không tìm thấy đối tượng"),
    CLASS_NOT_FOUND(HttpStatus.NOT_FOUND, "class ko tồn tại"),
    CLASS_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "class room ko tồn tại"),
    ZOOM_NOT_FOUND(HttpStatus.NOT_FOUND, "zoom ko tồn tại"),
    ACCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "account ko tồn tại"),
    ZOOM_NAME_EXISTED(HttpStatus.INTERNAL_SERVER_ERROR, "tên zoom đã tồn tại"),
    CLASS_NAME_EXISTED(HttpStatus.INTERNAL_SERVER_ERROR, "tên lớp đã tồn tại"),
    CLASS_ROOM_NAME_EXISTED(HttpStatus.INTERNAL_SERVER_ERROR, "tên phòng đã tồn tại"),
    NAME_EXISTED(HttpStatus.INTERNAL_SERVER_ERROR, "tên đã đã tồn tại"),
    USERNAME_EXISTED(HttpStatus.INTERNAL_SERVER_ERROR, "Username đã tồn tại"),
    LOGIN_FAILS(HttpStatus.UNAUTHORIZED, "Người dùng không tồn tại?"),
    DATE_TIME_INVALID(HttpStatus.BAD_REQUEST, "ngay bat dau va ngay ket thuc khong hop le"),
    FAILURE(HttpStatus.BAD_REQUEST, "khong thanh cong"),
    UPDATE_FAILURE(HttpStatus.BAD_REQUEST, "update khong thanh cong"),
    CREATE_FAILURE(HttpStatus.BAD_REQUEST, "create khong thanh cong"),
    LOGIN_FAILS_USERNAME(HttpStatus.UNAUTHORIZED, "Người dùng không tồn tại"),
    LOGIN_FAILS_PASSWORD(HttpStatus.UNAUTHORIZED, "Mật khẩu không đúng"),

    ;

    public final HttpStatus status;
    public final String message;

    ErrorResponseBase(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
