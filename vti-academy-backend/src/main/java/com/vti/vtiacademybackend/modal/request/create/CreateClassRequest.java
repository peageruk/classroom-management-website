package com.vti.vtiacademybackend.modal.request.create;

import com.vti.vtiacademybackend.modal.entity.ClassStatus;
import com.vti.vtiacademybackend.modal.entity.TeachingForm;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class CreateClassRequest {
    @NotBlank(message = "tên không được để trống")
    private String name;
    @NotNull(message = "ngày bắt đầu không được để trống")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @NotNull(message = "ngày kết thúc không được để trống")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    @NotNull(message = "class status không được để trống")
    private ClassStatus status;
    @NotNull(message = "teaching formkhông được để trống")
    private TeachingForm form;
//    @NotNull(message = "mentor id không được để trống")
    private int mentorId;
//    @NotNull(message = "zoom id không được để trống")
    private int zoomId;
//    @NotNull(message = "class room id không được để trống")
    private int classRoomId;
    private String description;
    @NotBlank(message = "schedule không được để trống")
    private String schedule;

}
