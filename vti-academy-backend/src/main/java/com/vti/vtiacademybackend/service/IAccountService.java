package com.vti.vtiacademybackend.service;

import com.vti.vtiacademybackend.modal.dto.AccountDto;
import com.vti.vtiacademybackend.modal.entity.ClassRoom;
import com.vti.vtiacademybackend.modal.request.create.CreateAccountRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchAccountRequest;
import com.vti.vtiacademybackend.modal.request.search.SearchClassRoomRequest;
import com.vti.vtiacademybackend.modal.request.update.UpdateAccountRequest;
import com.vti.vtiacademybackend.modal.entity.Account;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IAccountService {
    List<Account> getAll();

    Account getById(int id);

    Page<Account> search(SearchAccountRequest request);


    void create(CreateAccountRequest request);

    Account update(int id, UpdateAccountRequest request);
//    AccountDto update(int id, UpdateAccountRequest request);

    void delete(int id);
}
