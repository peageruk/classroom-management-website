package com.vti.vtiacademybackend.modal.request.create;

import com.vti.vtiacademybackend.validate.ZoomIdExists;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
public class CreateZoomRequest {
    @NotBlank(message = "không được để trống tên")
    private String name;
    @NotBlank(message = "không được để trống link")
    private String link;
    //    private String description;
//    private String note;
    @NotBlank(message = "không được để trống meeting id")
    private String meetingId;
    @NotBlank(message = "không được để trống passcode")
    private String passCode;
}
