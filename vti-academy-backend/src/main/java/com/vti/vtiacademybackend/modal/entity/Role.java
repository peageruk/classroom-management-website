package com.vti.vtiacademybackend.modal.entity;


import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN, MENTOR, TUTOR, STUDENT;

    @Override
    public String getAuthority() {
        return name();
    }
}
