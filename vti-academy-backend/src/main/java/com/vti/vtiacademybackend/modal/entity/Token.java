package com.vti.vtiacademybackend.modal.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "token", length = 191)
    private String token;

    @Column(name = "user_agent")
    private String userAgent; // Thông tin trình duyệt đang đăng nhập

    @Column(name = "expiration")
    private Date expiration;

}
