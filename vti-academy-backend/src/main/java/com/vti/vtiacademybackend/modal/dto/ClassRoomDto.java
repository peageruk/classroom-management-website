package com.vti.vtiacademybackend.modal.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class ClassRoomDto {
    private int id;
    private String name;
    private String address;
    private String note;
    private int size;
}
