package com.vti.vtiacademybackend.modal.request.update;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Data
public class UpdateClassRoomRequest {
    //    private int id;
    @NotBlank(message = "name không được để trống")
    private String name;
    @NotBlank(message = "address không được để trống")
    private String address;
    private String note;
    @Positive(message = "size phải là số nguyên")
    private int size;
}
