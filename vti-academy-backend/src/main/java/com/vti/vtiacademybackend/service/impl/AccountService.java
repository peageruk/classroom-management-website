package com.vti.vtiacademybackend.service.impl;

import com.vti.vtiacademybackend.exception.AppException;
import com.vti.vtiacademybackend.exception.ErrorResponseBase;
import com.vti.vtiacademybackend.modal.dto.AccountDto;
import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.modal.entity.Role;
import com.vti.vtiacademybackend.modal.request.BaseRequest;
import com.vti.vtiacademybackend.modal.request.create.CreateAccountRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchAccountRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateAccountRequest;
import com.vti.vtiacademybackend.modal.entity.Account;
import com.vti.vtiacademybackend.repository.AccountRepository;
import com.vti.vtiacademybackend.service.IAccountService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class AccountService implements IAccountService, UserDetailsService {
    @Autowired
    private AccountRepository repository;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public List<Account> getAll() {
        return repository.findAll();
    }

    public Account getById(int id) {
        Optional<Account> account = repository.findById(id);
        if (account.isEmpty()) {
            throw new AppException(ErrorResponseBase.NOT_FOUND);
        }
        return account.get();
    }



    @Override
    public Page<Account> search(SearchAccountRequest request) {
        PageRequest pageRequest = BaseRequest.buildPageRequest(request);
        return repository.findByUsernameContains(request.getName(), pageRequest);
    }

//    @Override
//    @Transactional(rollbackOn = Exception.class)
//    public void create(CreateAccountRequest request) {
//        Account account = new Account();
//        BeanUtils.copyProperties(request, account);
//        Optional<Account> accountCheck = repository.findByUsername(request.getUsername());
//        if (accountCheck.isPresent()) {
//            // username đã tồn tại -> bắn lỗi
//            throw new AppException(ErrorResponseBase.USERNAME_EXISTED);
//        }
//        account.setPassword(encoder.encode("123456"));
//        account.setRole(Role.STUDENT);
//        account.setAddress("");
//        account.setDateOfBirth(new Date());
////        Class clazz = classService.getById(request.getClassId());
////        account.setClassId(clazz);
////        account.setInformation("");
//        repository.save(account);
//    }
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void create(CreateAccountRequest request) {
        Account account = new Account();
        BeanUtils.copyProperties(request, account);
        Optional<Account> accountCheck = repository.findByUsername(request.getUsername());
        if (accountCheck.isPresent()) {
            // username đã tồn tại -> bắn lỗi
            throw new AppException(ErrorResponseBase.USERNAME_EXISTED);
        }
        account.setPassword(encoder.encode("123456"));
        account.setRole(Role.STUDENT);
        account.setAddress("");
        account.setDateOfBirth(new Date());
        repository.save(account);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Account update(int id, UpdateAccountRequest request) {
        Account account = getById(id);
        if(!encoder.matches(request.getOldPassword(), account.getPassword())){
            throw new AppException(ErrorResponseBase.LOGIN_FAILS_PASSWORD);
        }
        BeanUtils.copyProperties(request,account);
        account.setPassword(encoder.encode(request.getNewPassword()));
        return repository.save(account);
    }

    @Override
    public void resetPass(String username) {
        Optional<Account> account = repository.findByUsername(username);
        if (account.isEmpty()) {
            throw new AppException(ErrorResponseBase.ACCOUNT_NOT_FOUND);
        }
        account.get().setPassword(encoder.encode("123456"));
        repository.save(account.get());
    }
//    @Override
//    @Transactional(rollbackOn = Exception.class)
//    public AccountDto update(int id, UpdateAccountRequest request) {
//        AccountDto accountDto = new AccountDto();
//        Account account = getById(id);
//        Class clazz = classService.getById(request.getClassId());
//        if(!encoder.matches(request.getOldPassword(), account.getPassword())){
//
//            throw new AppException(ErrorResponseBase.LOGIN_FAILS_PASSWORD);
//        }
//        BeanUtils.copyProperties(request,account);
//        account.setPassword(encoder.encode(request.getNewPassword()));
//        account.setClassId(clazz);
//        accountDto.setClassId(clazz.getId());
//        BeanUtils.copyProperties(account,accountDto);
//        repository.save(account);
//        return accountDto;
//    }
    @Override
    public void delete(int id) {
        Account account = getById(id);
        repository.delete(account);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> optional = repository.findByUsername(username);
        if (optional.isPresent()) {
            Account account = optional.get();
            // Lấy giá trị authorities để phân quyền
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(account.getRole());

            return new User(account.getUsername(), account.getPassword(), authorities);
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

}
