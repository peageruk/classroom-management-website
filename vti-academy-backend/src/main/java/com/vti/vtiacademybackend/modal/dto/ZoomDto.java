package com.vti.vtiacademybackend.modal.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
public class ZoomDto {
    private int id;
    private String name;
    private String link;
    private String description;
    private String note;
    private String mettingId;
    private String passCode;
}
