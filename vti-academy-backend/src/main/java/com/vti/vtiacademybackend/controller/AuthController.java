package com.vti.vtiacademybackend.controller;

import com.vti.vtiacademybackend.config.jwt.JwtTokenProvider;
import com.vti.vtiacademybackend.exception.AppException;
import com.vti.vtiacademybackend.exception.ErrorResponseBase;
import com.vti.vtiacademybackend.modal.dto.LoginDto;
import com.vti.vtiacademybackend.modal.entity.Account;
import com.vti.vtiacademybackend.modal.request.LoginRequest;
import com.vti.vtiacademybackend.repository.AccountRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AccountRepository accountRepository;
    //    @Autowired
//    private JWTTokenUtils jwtTokenUtils;
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    HttpServletRequest httpServletRequest;

    @PostMapping("/login-v2")
    public LoginDto loginJWT(@RequestBody @Valid LoginRequest request) {
        // Tìm kiếm xem user có tồn tại trong hệ thống hay ko
        Optional<Account> accountOptional = accountRepository.findByUsername(request.getUsername());
        if (accountOptional.isEmpty()) {
            throw new AppException(ErrorResponseBase.LOGIN_FAILS_USERNAME);
        }
        // kiểm tra xem password người dùng truyền vào có đúng hay ko
        if (!encoder.matches(request.getPassword(), accountOptional.get().getPassword())) {
            // Nếu ko khớp passwors -> bắn ra lỗi
            throw new AppException(ErrorResponseBase.LOGIN_FAILS_PASSWORD);
        }
        // Tạo đối tượng LoginDto để trả về
        LoginDto loginDto = new LoginDto();
        BeanUtils.copyProperties(accountOptional.get(), loginDto);
        loginDto.setUserAgent(httpServletRequest.getHeader("User-Agent")); // Lấy thông tin trình duyệt đang sử dụng
        String token = tokenProvider.createAccessToken(loginDto); // Tạo token
        loginDto.setToken(token); // Set giá trị token vào loginDto để trả về cho người dùng sử dụng
        return loginDto;
    }

    @PostMapping("/login")
    public LoginDto login(Principal principal) {
        //Principal la doi tuong duoc tao ra sau khi authen
        String username = principal.getName();
        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isEmpty()) {
            throw new AppException(ErrorResponseBase.LOGIN_FAILS);
        }
        LoginDto loginDto = new LoginDto();
        BeanUtils.copyProperties(account.get(), loginDto);
        return loginDto;
    }

}
