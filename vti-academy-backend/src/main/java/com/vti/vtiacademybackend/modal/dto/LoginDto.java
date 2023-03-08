package com.vti.vtiacademybackend.modal.dto;

import com.vti.vtiacademybackend.modal.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {
    private int id;
    private String username;
    private Role role;
    private String fullName;
    private String userAgent;   // thong tin trinh duyet dang su dung
    private String token;
}
