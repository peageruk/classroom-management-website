package com.vti.vtiacademybackend.modal.dto;

import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.entity.Role;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
public class AccountDto {
    private int id;
    private String username;
    private Date dateOfBirth;
    private String address;
    private String password;
    private String fullName;
    private Role role;
    private String phoneNumber;
    private String email;
    private String facebook;
    private String information;
    private Integer classId;
}
