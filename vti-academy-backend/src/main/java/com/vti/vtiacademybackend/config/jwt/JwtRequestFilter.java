package com.vti.vtiacademybackend.config.jwt;

import com.vti.vtiacademybackend.modal.dto.LoginDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION = "Authorization";

    @Autowired
    private JwtTokenProvider jwtTokenUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, @NotNull HttpServletResponse httpServletResponse,
                                    @NotNull FilterChain filterChain) throws ServletException, IOException {
        // Lấy token từ api (request)
        String token = httpServletRequest.getHeader(AUTHORIZATION);
        String request = httpServletRequest.getRequestURI();

        if (StringUtils.containsAnyIgnoreCase(request, "/api/v1/auth/login")
                || StringUtils.containsAnyIgnoreCase(request, "/api/v1/accounts/create")
                || StringUtils.containsAnyIgnoreCase(request, "/api/v1/accounts/reset-password")
                || StringUtils.containsAnyIgnoreCase(request, "/api/v1/accounts/get-all")
                || StringUtils.containsAnyIgnoreCase(request, "/swagger-ui")
                || StringUtils.containsAnyIgnoreCase(request, "/swagger-resources")
                || StringUtils.containsAnyIgnoreCase(request, "/v3/api-docs")) {
            // Những api public ko cần check token -> doFilter
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } else {
            if (jwtTokenUtils.checkToken(token, httpServletResponse, httpServletRequest)) {
                // Giải mã token -> lấy thông tin user -> authen
                LoginDto loginDto = jwtTokenUtils.parseAccessToken(token);
                // Lấy danh sách quyền của user
                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(loginDto.getRole());
                // Tạo đối tượng để Authen vào hệ thống
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(httpServletRequest, httpServletResponse);
            }
        }
//        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

}
