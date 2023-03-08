package com.vti.vtiacademybackend.controller;

import com.vti.vtiacademybackend.modal.dto.AccountDto;
import com.vti.vtiacademybackend.modal.request.create.CreateAccountRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchAccountRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateAccountRequest;

import com.vti.vtiacademybackend.modal.entity.Account;
import com.vti.vtiacademybackend.modal.entity.Class;
import com.vti.vtiacademybackend.service.impl.AccountService;
import com.vti.vtiacademybackend.service.impl.ClassService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/v1/accounts")
@CrossOrigin("*")
public class AccountController {
    @Autowired
    private AccountService service;

    @GetMapping("/{id}")
    public Account getById(@PathVariable int id) {
        return service.getById(id);
    }

    @GetMapping("/get-all")
    public List<Account> getAll() {
        return service.getAll();
    }

    @PostMapping("/search")
    Page<Account> search(@RequestBody SearchAccountRequest request) {
        return service.search(request);
    }

    @PostMapping("/create")
    public void create(@RequestBody @Valid CreateAccountRequest request) {
        service.create(request);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public Account update(@RequestBody @Valid UpdateAccountRequest request, @PathVariable int id) {
        return service.update(id, request);
    }
//    @PostMapping("/update/{id}")
//    @PreAuthorize("hasAnyAuthority('ADMIN')")
//    public AccountDto update(@RequestBody @Valid UpdateAccountRequest request, @PathVariable int id) {
//        return service.update(id, request);
//    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }

}
