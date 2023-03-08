package com.vti.vtiacademybackend.modal.request.update;

import com.vti.vtiacademybackend.validate.ZoomIdExists;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
public class UpdateZoomRequest {
    @NotBlank(message = "không được để trống tên")
    private String name;
    @NotBlank(message = "không được để trống link")
    private String link;
    private String description;
    private String note;
    @NotBlank(message = "không được để trống meeting id")
    private String passCode;
}
