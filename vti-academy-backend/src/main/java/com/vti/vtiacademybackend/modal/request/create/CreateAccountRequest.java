package com.vti.vtiacademybackend.modal.request.create;

import com.vti.vtiacademybackend.modal.entity.Role;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class CreateAccountRequest {
    @NotBlank(message = "username không được để trống")
    private String username;
//    @NotNull(message = "dateOfBirth không được để trống")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
//    private Date dateOfBirth;
//    @NotBlank(message = "address không được để trống")
//    private String address;
    // pass mặc đinh là 123456
//    @NotBlank(message = "password không được để trống")
//    @Size(min = 6, max = 12, message = "pass phải có 6-12 ký tự")
//    private String password;
//    private String fullName;
    //role mặc ịnh là STUDENT
//    @NotNull(message = "role không được để trống")
//    private Role role;
    @NotBlank(message = "phoneNumber không được để trống")
    private String phoneNumber;
    @NotBlank(message = "email không được để trống")
    private String email;
    @NotBlank(message = "facebook không được để trống")
    private String facebook;
//    private String information;
//    private int classId;

}
