package com.vti.vtiacademybackend.config;

import com.vti.vtiacademybackend.service.IAccountService;
import com.vti.vtiacademybackend.service.IClassService;
import com.vti.vtiacademybackend.service.impl.AccountService;
import com.vti.vtiacademybackend.service.impl.ClassService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class OtherConfig {
    @Bean // Tạo beans với BCryptPasswordEncoder
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
