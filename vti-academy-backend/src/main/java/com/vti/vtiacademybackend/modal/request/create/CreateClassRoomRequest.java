package com.vti.vtiacademybackend.modal.request.create;

import lombok.Data;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Data
public class CreateClassRoomRequest {
    @NotBlank(message = "name không được để trống")
    private String name;
    @NotBlank(message = "address không được để trống")
    private String address;
    private String note;
    private int size;
}
