package com.vti.vtiacademybackend.modal.dto;

import com.vti.vtiacademybackend.modal.entity.*;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Date;

@Data
public class ClassDto {
    private int id;
    private String name;
    private Date startDate;
    private Date endDate;
    private ClassStatus status;
    private TeachingForm form;
    private Integer mentorId;
    private Integer zoomId;
    private Integer classRoomId;
    private String description;
    private String schedule;
}
