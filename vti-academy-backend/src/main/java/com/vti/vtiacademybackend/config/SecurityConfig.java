package com.vti.vtiacademybackend.config;

import com.vti.vtiacademybackend.config.jwt.JwtRequestFilter;
import com.vti.vtiacademybackend.service.impl.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // Để có thể phân quyền tại controller
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    AccountService accountService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountService).// Cấu hình UserDetailsService để khi xác thực người dùng sẽ gọi tới hàm loadUserByUsername()
                passwordEncoder(new BCryptPasswordEncoder());// Cấu hình phương thức để mã hoá mật khẩu
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/v1/auth/login-v2", "/api/v1/accounts/create", "/api/v1/accounts/get-all").permitAll() // config API ko cần xác thực
                .antMatchers(HttpMethod.GET, "api/admin").hasAuthority("ADMIN") //đường dẫn "/api/admin", chỉ có người dùng có quyền "ADMIN" mới được phép truy cập bằng phương thức GET.
                .antMatchers(HttpMethod.GET, "api/admin-or-user").hasAnyAuthority("ADMIN", "User") //đường dẫn "/api/admin-or-user", người dùng có quyền "ADMIN" hoặc "User" mới được phép truy cập bằng phương thức GET.
                .anyRequest().authenticated() // Những đường dẫn còn lại cần được xác thực,
                .and().httpBasic() // Kích hoạt cấu hình http basic trong Spring Security
                .and().cors().and().csrf().disable(); // tắt tính năng Cross-Site Request Forgery (CSRF) trong Spring Security.
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//        http.headers().cacheControl();
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .antMatchers("/", "/home").permitAll() // Cho phép tất cả mọi người truy cập vào 2 địa chỉ này
//                .anyRequest().authenticated() // Tất cả các request khác đều cần phải xác thực mới được truy cập
//                .and()
//                .formLogin() // Cho phép người dùng xác thực bằng form login
//                .defaultSuccessUrl("/hello")
//                .permitAll() // Tất cả đều được truy cập vào địa chỉ này
//                .and()
//                .logout() // Cho phép logout
//                .permitAll();
//    }

    @Override // Config cho đường dẫn (swagger) ko bị chặn bởi sercurity
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/swagger-ui/**")
                .antMatchers("/swagger-resources/**")
                .antMatchers("/v3/api-docs/**");
    }

}
